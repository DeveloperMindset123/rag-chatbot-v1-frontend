import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
// import { ApiKeysProvider } from "@/lib/api-keys";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RAG Chatbot",
  description:
    "An intelligent chatbot with multiple LLM options and RAG capabilities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
