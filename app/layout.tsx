import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cohere OS — Your Entire Day, Orchestrated",
  description: "AI that manages your comms, finances, habits, and daily life — proactively, without constant chatting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="h-full">{children}</body>
    </html>
  );
}
