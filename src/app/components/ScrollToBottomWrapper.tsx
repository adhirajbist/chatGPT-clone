import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ScrollToBottomWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showButton, setShowButton] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setShowButton(!entry.isIntersecting);
    });

    observer.observe(bottomRef.current!);
    return () => observer.disconnect();
  }, [children]);

  useEffect(() => {
    if (!showButton) {
      bottomRef.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [children]);

  return (
    <div className="relative flex-1 w-full overflow-hidden">
      <div className="h-full overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col gap-y-4">
          {children}
          <div ref={bottomRef} />
        </div>
      </div>
      {showButton && (
        <button
          className="absolute right-1/2 bottom-4 translate-x-1/2 border rounded-full bg-white"
          type="button"
          onClick={scrollToBottom}
        >
          <Image
            src="/arrow-down-circle.svg"
            height={32}
            width={32}
            alt="Send button"
          />
        </button>
      )}
    </div>
  );
}
