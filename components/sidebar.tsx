
"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {usePathname} from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard,
     ImageIcon,
    MessageSquare,
    VideoIcon,
    Music,
    Code,
    Settings
 } from "lucide-react";

const montserrat = Montserrat({
    weight: "700",
    subsets: ["latin"]
})
// defining routes
const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color : "text-sky-500"
    },
    {
        label: "NesterChat",
        icon: MessageSquare,
        href: "/NesterChat",
        color : "text-violet-500"
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
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        
    },
    
]

const Sidebar = () => {
    const pathname = usePathname();
    return ( 
        <div className="space-y-4 py-4 flex flex-col h-full bg-gray-80 text-black ">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">

                <div className="relative w-10 h-10 mr-4">
                    <Image
                    fill
                    alt="logo"
                    src="/logo.png"
                    />
                </div>
                <h1 className={cn("text-2xl font-bold",
                montserrat.className)}>
        NesterAI

                </h1>
                </Link>
                <div className="space-y-1">
{/* including the routes that we have defined 
which acts as links to respective pages */}
                    {routes.map((route)=> (
                    <Link href = 
                    {route.href}
                    key = {route.href}
                    className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-black hover:bg-black/10 rounded-lg tansition",
                    pathname === route.href ? "text-black bg-black/10" :
                    "text-zinc-700"
                    )}
                    >
                        
                   <div className="flex items-center flex-1">
                            <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                   {route.label}
                   </div>
                    </Link>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default Sidebar;