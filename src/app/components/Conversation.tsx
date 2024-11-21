import MessageBox from "./MessageBox";
import { MessageObject } from "../types/MessageObject";
import ScrollToBottomWrapper from "./ScrollToBottomWrapper";

export default function Conversation({
  messages,
}: {
  messages: MessageObject[];
}) {
  return (
    <ScrollToBottomWrapper>
      {messages.map((message: MessageObject, index: number) => (
        <MessageBox key={message.content + index} message={message} />
      ))}
    </ScrollToBottomWrapper>
  );
}
