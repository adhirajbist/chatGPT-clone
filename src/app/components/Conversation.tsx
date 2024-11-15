import MessageBox from "./MessageBox";
import { MessageObject } from "../types/MessageObject";

export default function Conversation({
  messages,
}: {
  messages: MessageObject[];
}) {
  return (
    <div className="flex-1 w-full overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col gap-y-4 h-full">
        {messages.map((message: MessageObject, index: number) => (
          <MessageBox key={message.content + index} message={message} />
        ))}
      </div>
    </div>
  );
}
