
'use client'

import { cn } from '@/lib/utils';
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import { User } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import EndCallButton from './EndCallButton';
import Loader from './Loader';


type CallLayoutType='grid'|'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
    const searchParams=useSearchParams()
    const isPersonalRoom=!!searchParams.get('personal')

    const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
    const [showParticipant, setShowParticipant] = useState(false);
    const router=useRouter();
    const { useCallCallingState}=useCallStateHooks();
    const calllingState=useCallCallingState();
    if(calllingState !== CallingState.JOINED) return <Loader/>

    

    const CallLayout=()=>{

        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout/>
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition='left'/>
                
            default:
                return <SpeakerLayout participantsBarPosition='right'/>
        }

    
    }

  return (
    <section className='relative h-screen w-full overflow-hidden pt-1 text-white'>
        <div className='relative flex size-full items-center justify-center'>
            <div className=' flex size-full max-w-[1000px] items-center'>
                <CallLayout/>
            </div>
            <div className={cn('h-[calc(100vh-86px)] hidden ml-2',{'show-block':showParticipant})}>
                <CallParticipantsList onClose={()=> setShowParticipant(false)}/>
            </div>
        </div>
        <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap '>
            <CallControls onLeave={()=>router.push('/')}/>
            <CallStatsButton/>

            <button onClick={()=>setShowParticipant((prev)=>!prev)}>
                <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2
                 hover:bg-[#4c535b]'>
                    <User/>

                </div>
            </button>
            {!isPersonalRoom && <EndCallButton/>}


        </div>
        


    </section>
  )
}

export default MeetingRoom