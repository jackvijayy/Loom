'use client'

import { cn } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'


  

interface HomeCardProps{
    className:string,
    title:string,
    des:string,
    img:string,
    handleClick:()=> void;


}


const Homecard = ({ className,title,des,handleClick,img}:HomeCardProps) => {
  return (
    <div className={cn(' px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer',className)}
    onClick={handleClick} >

       <div className=" flex-center glass size-12 rounded-[10px]">
           <Image src={img} alt="meeting"  width={27} height={27}/>

       </div>
       <div className="flex flex-col gap-2">
           <h1 className="text-2xl font-bold">{title}</h1>
           <p className="text-lg font-normal">{des}</p>

       </div>
       

   </div>
  )
}

export default Homecard