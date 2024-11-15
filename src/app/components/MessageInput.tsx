"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function MessageInput({
  handleMessageSend,
}: {
  handleMessageSend: (content: string) => void;
}) {
  const messageTextArea = useRef<HTMLDivElement>(null);
  const resetTextArea = () => {
    if (
      messageTextArea.current === null ||
      messageTextArea.current.innerText === ""
    ) {
      return "";
    }
    const text = messageTextArea.current.innerText;
    messageTextArea.current.innerText = "";
    return text;
  };
  const handleSendButtonClick = () => {
    const message = resetTextArea();
    if (message !== "") {
      handleMessageSend(message);
    }
  };
  const handleMessageInputKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendButtonClick();
    }
  };
  return (
    <div>
      <form>
        <div className="mx-auto px-3 md:max-w-3xl">
          <div className="relative flex gap-x-5 px-5 py-2 rounded-lg bg-white">
            <div
              ref={messageTextArea}
              className="flex-1 my-auto min-h-6 max-h-24 overflow-auto outline-none empty:before:text-gray-800 empty:before:content-[attr(data-placeholder)] empty:before:cursor-text whitespace-pre-wrap"
              data-placeholder="Enter Message"
              contentEditable
              suppressContentEditableWarning
              onKeyDown={handleMessageInputKey}
            ></div>
            <button
              className="self-end"
              type="button"
              onClick={handleSendButtonClick}
            >
              <Image
                src="/arrow-up-circle.svg"
                height={32}
                width={32}
                alt="Send button"
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
