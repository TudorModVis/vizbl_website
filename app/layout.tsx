import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ViZBL - Get To Know Your Friends",
  description: "With ViZBL, you can seamlessly integrate social interactions into your YouTube experience, making it more engaging and interactive than ever before.",
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
