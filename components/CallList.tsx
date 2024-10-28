// @ts-nocheck


'use client'

import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';
import Loader from './Loader';

const CallList = ({ type }:{ type:'ended' | 'upcoming' | 'recordings'}) => {

    const { endedCalls,upComingCalls,callRecordings,isLoading } =useGetCalls();

    const router =useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);


    const getCalls=()=>{    
    switch (type) {
        case 'ended':
            return endedCalls;
        case 'recordings':
            return recordings;

        case 'upcoming':
            return upComingCalls;
        
    
        default:
            return[];
    }
    }

    // no calls messages if not calls are created

    const getNoCallsMessage=()=>{    
        switch (type) {
            case 'ended':
                return 'No previous Calls';
            case 'recordings':
                return "No Recordings Calls";
    
            case 'upcoming':
                return 'No Upcoming Calls';
            
            default:
                return '';
        }
    }

    useEffect(() => {
        const fetchRecordings=async()=>{
            try {
                const callData=await Promise.all(callRecordings.map((meeting)=>meeting.queryRecordings()))
                const recordings=callData
                .filter(call=>call.recordings.length > 0)
                .flatMap(call=>call.recordings)
                setRecordings(recordings)
     
                
            } catch (error) {
                console.log(error)
                
            }

           

        }

        if(type==='recordings') fetchRecordings();
    
    }, [type,callRecordings])
    


    const calls=getCalls();
    const noCallMessages=getNoCallsMessage();
    if(isLoading) return <Loader/>
   

    
  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
        {calls && calls.length > 0 ? calls.map((meeting:Call | CallRecording,index: number) => (
            <MeetingCard
            key={(meeting as Call).id || index}
            title={(meeting as Call)?.state?.custom?.description?.substring(0,25)||meeting.filename?.substring(0,20) || 'No Description'}
            date={meeting.state?.startsAt.toLocaleString() || meeting.start_time.toLocaleString()}
            icon={
                type==='ended' ? '/icons/previous.svg' : type==='upcoming' ? '/icons/upcoming.svg' : 'icons/recordings.svg'
            }
            isPreviousMeeting={type==='ended'}
            buttonIcon1={type==='recordings' ? '/icons/recordings.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            handleClick={type==='recordings' ? ()=>{
                router.push(`${meeting.url}`)} : ()=>{
                    router.push(`/meeting/${meeting.id}`)

                }
            }
            link={type==='recordings' ? meeting.url :`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}/>

        )) : (
            <h1>{noCallMessages}</h1>
        )}

    </div>

  )
}


export default CallList