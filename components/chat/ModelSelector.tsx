"use client";

import { useState } from "react";
import { Check, ChevronDown, CircuitBoard, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useApiKeys } from "@/lib/api-keys";

const models = [
  {
    value: "openai",
    label: "OpenAI",
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.5093-2.6067-1.4997z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    value: "claude",
    label: "Claude",
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.7 12c0 2.9-1 5.4-2.9 7.6-1.6 1.9-3.9 3.2-6.4 3.4h-.1c-.9.1-1.7 0-2.7-.1-4-.5-7.3-3.4-8.5-7.2-.3-1-.5-2-.5-3.1v-.9c.1-4.9 3.5-9.1 8.2-10.2 1-.2 2.2-.5 3.3-.3 1.2.1 2.3.4 3.4.9 1.9.9 3.6 2.2 4.7 4 1.1 1.8 1.5 3.8 1.5 5.9zm-12.9 8c2 .3 4-.1 5.8-1.2 3-1.8 4.5-4.7 4.6-8.1 0-1.7-.5-3.3-1.4-4.7-2.2-3.5-6.5-5.1-10.5-3.7-3.7 1.3-6.3 4.7-6.5 8.6 0 4.3 2.7 7.7 6.8 8.8.4.1.8.2 1.2.3z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    value: "gemini",
    label: "Gemini",
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 12h7l1.5 2h3L15 12h7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 5.5L12 12l7-6.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 18.5L12 12l7 6.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    value: "ollama",
    label: "Ollama",
    icon: <CircuitBoard className="h-4 w-4" />,
  },
];

type ModelSelectorProps = {
  selectedModel: string;
  onSelectModel: (model: string) => void;
};

export default function ModelSelector({
  selectedModel,
  onSelectModel,
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const { getApiKey } = useApiKeys();

  const currentModel = models.find((model) => model.value === selectedModel);
  // const currentModel = "openai";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[170px] justify-between"
        >
          <div className="flex items-center space-x-2">
            {currentModel?.icon}

            <span>{currentModel?.label || "Select model..."}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search model..." />
          <CommandEmpty>No model found.</CommandEmpty>
          <CommandGroup>
            {models.map((model) => {
              const hasApiKey =
                model.value === "ollama" || !!getApiKey(model.value);

              return (
                <CommandItem
                  key={model.value}
                  value={model.value}
                  onSelect={() => {
                    onSelectModel(model.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex items-center",
                    !hasApiKey && "opacity-70"
                  )}
                >
                  <div className="flex items-center space-x-2 flex-1">
                    {model.icon}
                    <span>{model.label}</span>
                  </div>

                  {!hasApiKey && (
                    <span className="text-xs text-muted-foreground">
                      Missing API Key
                    </span>
                  )}

                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedModel === model.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
