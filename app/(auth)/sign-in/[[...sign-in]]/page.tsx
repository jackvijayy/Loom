import { SignIn, SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <main className=' h-screen w-full flex justify-center items-center'>
         <SignIn />

    </main>
 
  )
}