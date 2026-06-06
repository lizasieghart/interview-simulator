import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Interview Simulator | AI-Powered Practice",
  description:
    "Practice behavioral, case, and situational interview questions with AI-powered feedback.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
