import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import '@stream-io/video-react-sdk/dist/css/styles.css';



export const metadata: Metadata = {
  title: "AQUA",
  description: "NEXT GENERATION VIDEO CALL",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider> 
    <html lang="en">
      <body className={`bg-dark-2`}>
        {children}
      </body>
    </html>
    </ClerkProvider>
    
  
  );
}
