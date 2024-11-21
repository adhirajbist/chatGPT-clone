import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { MessageObject } from "../types/MessageObject";
import postChatCompletion from "../actions/postChatCompletion";

export default function useChatCompletion() {
  const [messages, setMessages] = useState<MessageObject[]>([]);
  const mutation = useMutation({
    mutationFn: (newMessages: MessageObject[]) =>
      postChatCompletion(newMessages),

    onSuccess: async (stream) => {
      for await (const chunk of stream) {
        if (
          chunk.choices[0]?.finish_reason !== null ||
          !chunk.choices[0]?.delta
        ) {
          return;
        }

        const messageChunk = chunk.choices[0].delta as MessageObject;

        setMessages((messages) => {
          if (messageChunk.role) {
            return [...messages, messageChunk];
          }

          const messagesCopy = [...messages];
          const messagesLength = messagesCopy.length;
          if (messagesLength > 1) {
            const lastMessageCopy = { ...messagesCopy[messagesLength - 1] };
            lastMessageCopy.content += messageChunk.content;
            messagesCopy[messagesLength - 1] = lastMessageCopy;
          }
          return messagesCopy;
        });
      }
    },
  });
  return { messages, setMessages, mutation };
}
