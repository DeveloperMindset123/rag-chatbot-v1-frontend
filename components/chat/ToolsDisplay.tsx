"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, PenTool as Tool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "@/lib/framer-motion";

type ToolDisplayProps = {
  tools: any[];
};

export function ToolsDisplay({ tools }: ToolDisplayProps) {
  const [expanded, setExpanded] = useState(false);

  if (!tools || tools.length === 0) return null;

  return (
    <div className="w-full">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setExpanded(!expanded)}
        className="text-xs text-muted-foreground flex items-center mb-1 hover:bg-transparent hover:underline p-1"
      >
        <Tool className="h-3 w-3 mr-1" />
        <span>{expanded ? "Hide" : "Show"} tools used ({tools.length})</span>
        {expanded ? (
          <ChevronUp className="h-3 w-3 ml-1" />
        ) : (
          <ChevronDown className="h-3 w-3 ml-1" />
        )}
      </Button>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-2">
              {tools.map((tool, idx) => (
                <Card key={idx} className="text-xs shadow-sm">
                  <CardHeader className="py-2 px-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-medium">
                        {tool.name || "Tool"}
                      </CardTitle>
                      <Badge variant="outline" className="text-[10px] h-5">
                        {tool.type || "unknown"}
                      </Badge>
                    </div>
                    {tool.description && (
                      <CardDescription className="text-xs mt-1">
                        {tool.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="py-2 px-3">
                    <div className="text-xs overflow-x-auto">
                      <pre className="text-xs bg-muted p-2 rounded">
                        {JSON.stringify(tool.parameters || {}, null, 2)}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}