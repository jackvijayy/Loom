'use client'

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallByid } from "@/hooks/useGetCallByid";
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";


import { use } from 'react';



const Meeting = ({ params}: { params:Promise< { id: string }> }) => {

  const [isSetupComplete, setIsSetupComplete] = useState(true);
  const {user,isLoaded} =useUser();


  const unwrappedParams = use(params); // Unwrap the Promise
  const { id } = unwrappedParams;

  const { call,isCallLoading }=useGetCallByid(id);
  if(!isLoaded || isCallLoading) return <Loader/>




  return (
    <main  className="w-full h-screen">
      <StreamCall call={call}>
        <StreamTheme>
          {isSetupComplete ? (
          <MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
          ):(
            <MeetingRoom/>
          )}


        </StreamTheme>

      </StreamCall>
 
    </main>
 
  
    
  )
}

export default Meeting