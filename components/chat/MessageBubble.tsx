"use client";

import React from "react";
import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToolsDisplay } from "@/components/chat/ToolsDisplay";
import { motion } from "@/lib/framer-motion";

type MessageBubbleProps = {
  message: {
    role: "user" | "assistant";
    content: string;
    tools?: any[];
  };
  isLatestAssistantMessage?: boolean;
};

export default function MessageBubble({ 
  message, 
  isLatestAssistantMessage = false 
}: MessageBubbleProps) {
  const isUser = message.role === "user";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-start space-x-2 sm:space-x-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary" />
        </div>
      )}
      
      <div className={cn(
        "flex flex-col space-y-2 max-w-[80%]",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "px-4 py-2 rounded-lg shadow-sm",
          isUser ? "bg-primary text-primary-foreground" : "bg-card border"
        )}>
          {message.content.split('\n').map((text, i) => (
            <React.Fragment key={i}>
              {text}
              {i !== message.content.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        
        {/* Display tools if they exist */}
        {message.tools && message.tools.length > 0 && (
          <div className="mt-2 text-sm">
            <ToolsDisplay tools={message.tools} />
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-5 w-5 text-primary" />
        </div>
      )}
    </motion.div>
  );
}