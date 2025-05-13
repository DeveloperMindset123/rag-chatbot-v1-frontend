"use client";

import React, { useEffect, useRef, useState } from "react";
import { Send, Mic, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "@/components/chat/MessageBubble";
import { ToolsDisplay } from "@/components/chat/ToolsDisplay";
import { useToast } from "@/hooks/use-toast";
import { AnimatedLoadingDots } from "@/components/ui/animated-loading-dots";
// import { ApiKeyDialog } from "@/components/chat/ApiKeyDialog";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import path from "path";

// Message type definition
type Message = {
  role: "user" | "assistant";
  content: string;
  tools?: any[];
  processedContent?: string; // Add this to store processed markdown HTML
};

type LoadingMessage =
  | "Fetching vector database..."
  | "Using available tools..."
  | "Validating with prompts..."
  | "Processing request..."
  | "Analyzing context..."
  | "Generating response...";

const loadingMessages: LoadingMessage[] = [
  "Fetching vector database...",
  "Using available tools...",
  "Validating with prompts...",
  "Processing request...",
  "Analyzing context...",
  "Generating response...",
];

// Utility function to convert markdown to HTML
async function markdownToHtml(markdown: string) {
  // First, remove any literal '**' characters that weren't processed
  const cleanedMarkdown = markdown.replace(/\\\*\*/g, "");

  const result = await remark()
    .use(html)
    .use(remarkGfm) // Add GitHub Flavored Markdown support
    .process(cleanedMarkdown);

  return result.toString();
}

export default function ChatInterface({
  selectedModel,
  serverStatus,
}: {
  selectedModel: string;
  serverStatus: "online" | "offline" | "checking";
}) {
  const markdownDataFilePath = path.join(
    process.cwd(),
    "markdown/llm_response.md"
  );

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentLoadingMsg, setCurrentLoadingMsg] = useState<LoadingMessage>(
    loadingMessages[0]
  );
  const [isRecording, setIsRecording] = useState(false);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  // const { apiKeys, getApiKey } = useApiKeys();

  const { toast } = useToast();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const loadingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Process markdown content for existing messages
  useEffect(() => {
    const processMarkdown = async () => {
      const updatedMessages = await Promise.all(
        messages.map(async (message) => {
          if (message.role === "assistant" && !message.processedContent) {
            // Clean and process content
            const htmlContent = await markdownToHtml(message.content);
            return { ...message, processedContent: htmlContent };
          }
          return message;
        })
      );
      setMessages(updatedMessages);
    };

    processMarkdown();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Change loading message periodically
  useEffect(() => {
    if (isLoading) {
      let index = 0;
      loadingIntervalRef.current = setInterval(() => {
        index = (index + 1) % loadingMessages.length;
        setCurrentLoadingMsg(loadingMessages[index]);
      }, 3000);
    } else if (loadingIntervalRef.current) {
      clearInterval(loadingIntervalRef.current);
    }

    return () => {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
      }
    };
  }, [isLoading]);

  const handleSendMessage = async () => {
    if (input.trim() === "" || isLoading) return;

    if (serverStatus !== "online") {
      toast({
        title: "Server Offline",
        description: "Cannot send message while the server is offline.",
        variant: "destructive",
      });
      return;
    }

    // ensure that
    if (selectedModel !== "claude") {
      toast({
        title: "Model Not Available",
        description: "Support for this model is not yet available.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "user",
          query: input,
          llm: selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Process markdown to HTML
      const processedContent = await markdownToHtml(
        data["final_response"] || ""
      );

      // Check if the response contains tools information
      const toolsUsed = data.tools || [];

      const assistantMessage: Message = {
        role: "assistant",
        content:
          data["final_response"] ||
          "I'm sorry, I couldn't generate a response.",
        processedContent: processedContent,
        tools: toolsUsed.length > 0 ? toolsUsed : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "An error occurred while fetching the response.",
        variant: "destructive",
      });

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I encountered an error while processing your request. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      audioChunksRef.current = [];
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        await processAudioToText(audioBlob);

        // Stop all tracks of the stream
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      toast({
        title: "Recording Started",
        description: "Speak now. Click the stop button when finished.",
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Microphone Error",
        description:
          "Unable to access your microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      toast({
        title: "Processing Audio",
        description: "Converting your speech to text...",
      });
    }
  };

  const processAudioToText = async (audioBlob: Blob) => {
    // In a real app, you would send this to OpenAI's Whisper API or similar
    // For demo purposes, we'll simulate a response
    setIsLoading(true);
    try {
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulated text result from audio
      const simulatedText =
        "This is a simulated transcription of the audio recording.";
      setInput(simulatedText);

      toast({
        title: "Transcription Complete",
        description:
          "Your speech has been converted to text. You can edit it before sending.",
      });
    } catch (error) {
      console.error("Error processing audio:", error);
      toast({
        title: "Transcription Error",
        description: "Failed to convert audio to text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <ScrollArea className="overflow-y-auto overflow-x-hidden px-4 py-2 grow max-h-[calc(100vh-120px)]">
        <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message}
              isLatestAssistantMessage={
                message.role === "assistant" &&
                index === messages.findLastIndex((m) => m.role === "assistant")
              }
            />
          ))}

          {isLoading && (
            <div className="flex flex-col space-y-2 bg-muted/40 p-4 rounded-lg max-w-[80%] self-start animate-pulse">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{currentLoadingMsg}</span>
                <AnimatedLoadingDots />
              </div>

              {/* If there are tools being used in the last message, show them */}
              {messages.length > 0 && messages[messages.length - 1]?.tools && (
                <ToolsDisplay
                  tools={messages[messages.length - 1].tools || []}
                />
              )}
            </div>
          )}

          <div ref={endOfMessagesRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="max-w-3xl mx-auto flex items-center space-x-2">
          <Button
            size="icon"
            variant={isRecording ? "destructive" : "outline"}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isLoading}
            className="transition-all duration-300"
            aria-label={isRecording ? "Stop recording" : "Start recording"}
          >
            {isRecording ? (
              <StopCircle className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={isLoading || isRecording}
          />

          <Button
            onClick={handleSendMessage}
            disabled={input.trim() === "" || isLoading || isRecording}
            className="transition-all duration-300 hover:shadow-md"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* API Key Dialog */}
      {/* <ApiKeyDialog
        open={showApiKeyDialog}
        onOpenChange={setShowApiKeyDialog}
        selectedModel={selectedModel}
      /> */}
    </div>
  );
}
