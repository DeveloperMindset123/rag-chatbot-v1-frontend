"use client";

import { cn } from "@/lib/utils";

export function AnimatedLoadingDots({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex space-x-1", className)}>
      <div className="h-2 w-2 rounded-full bg-current animate-loading-dot" />
      <div className="h-2 w-2 rounded-full bg-current animate-loading-dot animation-delay-200" />
      <div className="h-2 w-2 rounded-full bg-current animate-loading-dot animation-delay-400" />
    </div>
  );
}