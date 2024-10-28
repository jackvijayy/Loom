"use client";
import { useState } from "react";
import Homecard from "./Homecard";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Textarea } from "./ui/textarea";
import DatePicker from "react-datepicker";
import { Input } from "./ui/input";

const MeetingTypeList = () => {
  const router = useRouter();

  const [meetingState, setMeetingState] = useState<
    "isSchedulingMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const { user } = useUser();
  const client = useStreamVideoClient();
  const [value, setValue] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create a call");
      const startAt =
        value.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = value.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!value.description) {
        router.push(`/meeting/${call.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting${callDetails?.id}`;
  return (
    <section className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-2">
      <Homecard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        des="start an instant meeeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-orange-1"
      />

      <Homecard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        des="Plan your meeting"
        handleClick={() => setMeetingState("isSchedulingMeeting")}
        className="bg-blue-1"
      />

      <Homecard
        img="/icons/recordings.svg"
        title="View Recordings"
        des="Check Out your Recordings"
        handleClick={() => router.push("/recordings")}
        className="bg-purple-1"
      />

      <Homecard
        img="/icons/join-meeting.svg"
        title="join Meeting"
        des="via invitation"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-yellow-1"
      />

      {!callDetails ? (
        <MeetingModel
          isOpen={meetingState === "isSchedulingMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22px] text-sky-2">
              Add a Description
            </label>
            <Textarea
              className="border-none bg-dark-2 focus-visible:ring-0 
                        focus-visible:ring-offset-0 "
              onChange={(e) => {
                setValue({ ...value, description: e.target.value });
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22px] text-sky-2">
              Select Date And Time
            </label>
            <DatePicker
              selected={value.dateTime}
              onChange={(date) => setValue({ ...value, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d,yyyy h:mm aa"
              className="w-full rounded bg-dark-2 p-2 focus:outline-none"
            />
          </div>
        </MeetingModel>
      ) : (
        <MeetingModel
          isOpen={meetingState === "isSchedulingMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="meeting Created"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="copy Meeting Link"
        />
      )}

      <MeetingModel
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant Meeting"
        className="text-center"
        buttonText="Start meeting"
        handleClick={createMeeting}
      />

      <MeetingModel
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type of link Here"
        className="text-center"
        buttonText="join meeting"
        handleClick={()=>router.push(value.link)}
      >
        <Input
        placeholder="Meeting Link"
        className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={(e)=>setValue({ ...value,link:e.target.value})}/>
        </MeetingModel>
    </section>
  );
};

export default MeetingTypeList;
