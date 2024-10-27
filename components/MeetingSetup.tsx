'use client'

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({ setIsSetupComplete }:{setIsSetupComplete:(value:boolean)=>void}) => {
    const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);

    const call=useCall();
    if(!call){
        throw new Error('usecall must be within StreamCall component')

    }
    useEffect(() => {
        if(isMicCamToggleOn){
            call?.camera.disable();
            call?.microphone.disable();
        }
        else{
            call?.camera.enable();
            call?.microphone.enable();
        }
     
    }, [isMicCamToggleOn,call?.camera,call?.microphone])
    





  return (
    <div className=' flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
        <h1 className='text-2xl font-bold'>Setup</h1>
        <VideoPreview/>
        <div className=' flex h-16 items-center justify-center gap-3'>
            <label className='flex items-center justify-center gap-2 font-medium'>
                <input
                type='checkbox'
                checked={isMicCamToggleOn}
                onChange={(e)=>setIsMicCamToggleOn(e.target.checked)}/>
                join with mic and camera off

            </label>
            <DeviceSettings/>

        </div>
        <Button className='bg-green-500 rounded-md px-4 py-2.5'
        onClick={()=>{
            call.join();
            setIsSetupComplete(false)
        }}>
            join meeting

        </Button>


    </div>
  )
}

export default MeetingSetup