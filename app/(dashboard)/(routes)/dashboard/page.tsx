"use client"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";
import React from "react";
import { ArrowRight, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { LayoutDashboard,

  ImageIcon,
 VideoIcon,
 Music,
 Code,
 
} from "lucide-react";
const tools = [
  {
  label: "NesterChat",
  icon: MessageSquare,
  color: "text-violet-500",
  bgColor: "bg-black-500/10",
  href: "/NesterChat"
},
{
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color : "text-pink-500"
},
{
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color : "text-orange-700"
},
{
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color : "text-blue-700"
},
{
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color : "text-green-700"
}
]


const DashboardPage = () => {
  const router = useRouter();

    return(
      <div>
        <div className="mb-8 space-y-4">  
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            Your Ultimate AI Companion
          </h2>
          <p className="text-light text-center text-muted-foreground text-sm md:text-lg ">
            Create Music, Video, Code and much more using NesterAI</p>
         </div>
         <div className="px-4 md:px-20 lg:px-32 space-y-4">
            {tools.map((tool) => (
              <Card
              onClick={()=> router.push(tool.href)} 
               key={tool.href}
               className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
              
              
              >
                  <div className="flex items-center gap-x-4">

                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                      <tool.icon className={cn("w-8 h-8", tool.color)} />

                    </div>
                    <div className="font-semibold">
                      {tool.label}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5" />

              </Card>
            ))}
         </div>
         </div>
      
    )
}

export default DashboardPage;
