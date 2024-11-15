"use server";

import { assistantConfig } from "../../../hiAssistant.config";
import { MessageObject } from "../types/MessageObject";

export default async function postChatCompletion(messages: MessageObject[]) {
  const apiUrl = process.env.API_URL as string;
  const apiKey = process.env.API_KEY as string;
  const { model } = assistantConfig;

  const requestBody = {
    model,
    messages,
  };
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const chatCompletion = await response.json();
  return chatCompletion;
}
