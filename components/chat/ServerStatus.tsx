"use client";

import { Server } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type ServerStatusProps = {
  status: "online" | "offline" | "checking";
};

export function ServerStatus({ status }: ServerStatusProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <div className="relative flex items-center">
              <Server className="h-4 w-4" />
              <div
                className={cn(
                  "absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full",
                  status === "online" && "bg-green-500",
                  status === "offline" && "bg-red-500", 
                  status === "checking" && "bg-yellow-500 animate-pulse"
                )}
              />
            </div>
            <span>
              {status === "online" && "Online"}
              {status === "offline" && "Offline"}
              {status === "checking" && "Checking..."}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {status === "online" && "Backend server is connected on localhost:8000"}
            {status === "offline" && "Backend server is not responding"}
            {status === "checking" && "Checking backend server status..."}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}