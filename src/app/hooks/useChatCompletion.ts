import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { MessageObject } from "../types/MessageObject";
import postChatCompletion from "../actions/postChatCompletion";

export default function useChatCompletion() {
  const [messages, setMessages] = useState<MessageObject[]>([]);
  const mutation = useMutation({
    mutationFn: (newMessages: MessageObject[]) =>
      postChatCompletion(newMessages),
    onSuccess: (chatCompletionResponse) => {
      setMessages([...messages, chatCompletionResponse.choices[0].message]);
    },
  });
  return { messages, setMessages, mutation };
}
