import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Relora",
  description: "CRM do kontaktów, kontekstu, relacji i ręcznie akceptowanych wiadomości.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
