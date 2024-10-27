'use client'
import { useState } from "react"
import Homecard from "./Homecard"
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";




const MeetingTypeList = () => {
    const router = useRouter();
 

    const [meetingState,setMeetingState]=useState<'isSchedulingMeeting' | 'isJoiningMeeting' | 'isInstantMeeting'| undefined>();
    
    const {user}=useUser();
    const client =useStreamVideoClient();
    const [value,setValue]=useState({
        dateTime: new Date(),
        description:'',
        link:''
    })
    const [callDetails,setCallDetails]=useState<Call>()



    const createMeeting= async()=>{
        if(!client || !user) return;
        try{
            const id=crypto.randomUUID();
            const call =client.call('default',id)
            if(!call) throw new Error('Failed to create a call')
            const startAt=value.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description=value.description || 'Instant meeting';

            await call.getOrCreate({
                 data:{
                    starts_at:startAt,
                    custom:{
                        description
                    }
                 }
            })
            setCallDetails(call);
            if(!value.description){
                router.push(`/meeting/${call.id}`)
            }



        }
        catch(error){
            console.log(error)

        }

        


    }
  return (
    <section className='grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-2'>
        <Homecard
        img='/icons/add-meeting.svg'
        title="New Meeting"
        des='start an instant meeeting'
        handleClick={()=>setMeetingState('isInstantMeeting')}
        className="bg-orange-1"/>

        <Homecard
        img='/icons/schedule.svg'
        title="Schedule Meeting" 
        des='Plan your meeting'
        handleClick={()=>setMeetingState('isSchedulingMeeting')}
        
        className="bg-blue-1"/>

        <Homecard
        img='/icons/recordings.svg'
        title="View Recordings"
        des='Check Out your Recordings'
        handleClick={()=>setMeetingState('isJoiningMeeting')}
        className="bg-purple-1"/>

        <Homecard
        img='/icons/join-meeting.svg'
        title="join Meeting"
        des='via invitation'
        handleClick={()=> setMeetingState('isInstantMeeting')}
        className="bg-yellow-1"/>

        <MeetingModel
        isOpen={ meetingState === 'isInstantMeeting'}
        onClose={()=>setMeetingState(undefined)}
        title="Start an instant Meeting"
        className="text-center"
        buttonText="Start meeting"
        handleClick={createMeeting}/>
        

    </section>
  )
}

export default MeetingTypeList