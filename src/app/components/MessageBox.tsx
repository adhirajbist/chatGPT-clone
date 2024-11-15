import { MessageObject } from "../types/MessageObject";
import { assistantConfig } from "../../../hiAssistant.config";

export default function MessageBox({ message }: { message: MessageObject }) {
  const { role, content } = message;
  return (
    <div className="w-screen">
      <div
        className={`flex mx-auto px-3 md:max-w-3xl ${
          role === assistantConfig.role && "flex-row-reverse"
        }`}
      >
        <div className="max-w-[70%] px-5 py-2 rounded-lg break-words bg-white whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  );
}
