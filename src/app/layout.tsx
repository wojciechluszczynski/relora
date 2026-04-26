import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Relora",
  description: "Kokpit relacji, analizy, CRM i wysyłki z podglądem wiadomości.",
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
