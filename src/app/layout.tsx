import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Relora",
  description: "People intelligence, personal CRM and outreach cockpit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
