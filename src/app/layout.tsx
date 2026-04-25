import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Relora",
  description: "Kokpit relacji, researchu, CRM i outreachu z podglądem wiadomości.",
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
