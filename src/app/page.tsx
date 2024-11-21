"use client";

import useChatCompletion from "./hooks/useChatCompletion";
import MessageInput from "./components/MessageInput";
import Conversation from "./components/Conversation";
import { assistantConfig } from "../../hiAssistant.config";

export default function Home() {
  const { messages, setMessages, mutation } = useChatCompletion();
  const { role } = assistantConfig;

  const handleMessageSend = (content: string) => {
    const newMessage = {
      role,
      content,
    };
    setMessages([...messages, newMessage]);
    mutation.mutate([...messages, newMessage]);
  };
  return (
    <div className="h-full w-full flex flex-col gap-y-1 py-4">
      <Conversation messages={messages} />
      <MessageInput
        handleMessageSend={handleMessageSend}
        replyIsLoading={mutation.isPending}
      />
    </div>
  );
}
