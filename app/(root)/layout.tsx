import StreamVideoProvider from "@/providers/StreamClientProvider"
import { ReactNode } from "react"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AQUA",
  description: "NEXT GENERATION VIDEO CALL",
  icons:{
    icon:'/icons/logo.svg'
  }
};


const RootLayout = ({ children } :{ children:ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>

      
        {children}
        </StreamVideoProvider>
    </main>
   
  )
}

export default RootLayout