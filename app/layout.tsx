import type { Metadata } from "next";

import "./globals.css";



export const metadata: Metadata = {
  title: "AQUA",
  description: "NEXT GENERATION VIDEO CALL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-dark-1`}>
        {children}
      </body>
    </html>
  );
}
