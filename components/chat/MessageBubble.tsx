import React from "react";

type MessageBubbleProps = {
  message: {
    role: string;
    content: string;
    processedContent?: string;
    tools?: any[];
  };
  isLatestAssistantMessage: boolean;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isLatestAssistantMessage,
}) => {
  const isAssistant = message.role === "assistant";

  return (
    <div className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div
        className={`${
          isAssistant
            ? "bg-muted/60 text-foreground rounded-tl-sm"
            : "bg-primary text-primary-foreground rounded-tr-sm"
        } p-4 rounded-2xl max-w-[80%] overflow-hidden`}
      >
        {message.processedContent ? (
          <div
            className="prose dark:prose-invert prose-base max-w-none break-words overflow-hidden"
            dangerouslySetInnerHTML={{ __html: message.processedContent }}
          />
        ) : (
          <p className="whitespace-pre-wrap text-base break-words">
            {message.content}
          </p>
        )}

        {/* Display any tools information if available */}
        {message.tools && message.tools.length > 0 && (
          <div className="mt-2 pt-2 border-t border-muted-foreground/20">
            <p className="text-xs text-muted-foreground mb-1">Tools used:</p>
            {message.tools.map((tool, idx) => (
              <div key={idx} className="text-xs bg-background/50 p-1 rounded">
                {tool.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
