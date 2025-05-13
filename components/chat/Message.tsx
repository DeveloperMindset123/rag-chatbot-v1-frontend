import { Message as Message_AI } from "ai/react";
import { UserMessage } from "./UserMessage";
import { AssistantMessage } from "./assistant-mesage";
interface Props {
  message: Message_AI;
}

export default function Message({ message }: Props) {
  switch (message.role) {
    case "user":
      return <UserMessage>{message.content}</UserMessage>;
    case "assistant":
      return <AssistantMessage>{message.content}</AssistantMessage>;
    default:
      throw new Error(`Unknown message role: ${message.role}`);
  }
}
