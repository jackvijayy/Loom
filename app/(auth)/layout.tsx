import Navbar from "@/components/Navbar"
import Image from "next/image"
import { ReactNode } from "react"


const RootLayout = ({ children } :{ children:ReactNode}) => {
  return (
    <main className="bg-black">
        {children}
    </main>
   
  )
}

export default RootLayout