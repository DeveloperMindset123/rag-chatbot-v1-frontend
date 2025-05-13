"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ChatInterface from "@/components/chat/ChatInterface";
import ModelSelector from "@/components/chat/ModelSelector";
import { ServerStatus } from "@/components/chat/ServerStatus";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";

export default function ChatPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [serverStatus, setServerStatus] = useState<
    "online" | "offline" | "checking"
  >("checking");
  const [selectedModel, setSelectedModel] = useState("claude");

  useEffect(() => {
    // Check if the server is running
    const checkServerStatus = async () => {
      try {
        const response = await fetch("http://localhost:8000/ping", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setServerStatus("online");
        } else {
          setServerStatus("offline");
          toast({
            title: "Server Unavailable",
            description:
              "The backend server is not responding. Some features may not work.",
            variant: "destructive",
          });
        }
      } catch (error) {
        setServerStatus("offline");
        toast({
          title: "Server Unavailable",
          description:
            "The backend server is not responding. Some features may not work.",
          variant: "destructive",
        });
      }
    };

    checkServerStatus();
    // Poll server status every 600 seconds
    const interval = setInterval(checkServerStatus, 600000);

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/")}
            aria-label="Back to home"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold"></h1>
        </div>
        <div className="flex items-center gap-4">
          <ServerStatus status={serverStatus} />
          <ModelSelector
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
          />
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden h-screen">
        <ChatInterface selectedModel={selectedModel} serverStatus={"online"} />
      </main>
    </div>
  );
}
