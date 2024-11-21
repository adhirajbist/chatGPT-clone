"use server";

import { assistantConfig } from "../../../hiAssistant.config";
import { MessageObject } from "../types/MessageObject";
import OpenAI from "openai";

export default async function postChatCompletion(messages: MessageObject[]) {
  const apiKey = process.env.API_KEY as string;
  const { model } = assistantConfig;

  const openai = new OpenAI({
    apiKey,
  });

  const stream = await openai.chat.completions.create({
    model,
    messages,
    stream: true,
  });

  return stream;
}
