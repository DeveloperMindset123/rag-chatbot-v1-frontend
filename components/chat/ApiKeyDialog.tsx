"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiKeys } from "@/lib/api-keys";
import { useToast } from "@/hooks/use-toast";

const modelInfo = {
  openai: {
    title: "OpenAI API Key",
    description: "Enter your OpenAI API key to use GPT models.",
    placeholder: "sk-...",
    link: "https://platform.openai.com/account/api-keys",
  },
  claude: {
    title: "Claude API Key",
    description: "Enter your Anthropic API key to use Claude models.",
    placeholder: "sk-ant-...",
    link: "https://console.anthropic.com/account/keys",
  },
  gemini: {
    title: "Gemini API Key",
    description: "Enter your Google API key to use Gemini models.",
    placeholder: "AIza...",
    link: "https://ai.google.dev/",
  },
};

type ApiKeyDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedModel: string;
};

export function ApiKeyDialog({ 
  open, 
  onOpenChange, 
  selectedModel 
}: ApiKeyDialogProps) {
  const { setApiKey, getApiKey } = useApiKeys();
  const { toast } = useToast();
  const [apiKey, setApiKeyState] = useState("");
  
  // Load existing API key if it exists
  useEffect(() => {
    if (open && selectedModel !== "ollama") {
      const existingKey = getApiKey(selectedModel);
      if (existingKey) {
        setApiKeyState(existingKey);
      } else {
        setApiKeyState("");
      }
    }
  }, [open, selectedModel, getApiKey]);
  
  // Only show dialog for models that need API keys
  if (selectedModel === "ollama" || !modelInfo[selectedModel as keyof typeof modelInfo]) {
    return null;
  }
  
  const info = modelInfo[selectedModel as keyof typeof modelInfo];
  
  const handleSave = () => {
    if (apiKey.trim() === "") {
      toast({
        title: "API Key Required",
        description: "Please enter a valid API key.",
        variant: "destructive",
      });
      return;
    }
    
    // Save the API key
    setApiKey(selectedModel, apiKey);
    
    toast({
      title: "API Key Saved",
      description: `Your ${info.title} has been saved.`,
    });
    
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{info.title}</DialogTitle>
          <DialogDescription>
            {info.description}{" "}
            <a 
              href={info.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80"
            >
              Get an API key
            </a>
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apiKey" className="text-right">
              API Key
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder={info.placeholder}
              value={apiKey}
              onChange={(e) => setApiKeyState(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}