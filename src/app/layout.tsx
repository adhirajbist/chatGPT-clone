import Providers from "./providers";
import type { Metadata } from "next";
import { assistantConfig } from "../../hiAssistant.config";
import "./globals.css";

export const metadata: Metadata = {
  title: assistantConfig.title,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
