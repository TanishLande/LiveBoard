"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useOthers, useSelf } from "@/liveblocks.config"
import { UserAvatar } from "./user-avatar"
import { User } from "lucide-react";
import { connectionIdtoColors } from "@/lib/utils";
import { connect } from "http2";

const MAX_OTHER_USER = 3;

export const Participants = () =>{
    const user = useOthers();
    const currentuser = useSelf();
    const hasMoreUser =  user.length > MAX_OTHER_USER;

    return(
        <div
        className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex ite-center shadow-md
        "
        >
            <div
            className="flex gap-x-2"
            >
                {currentuser && (
                    <UserAvatar
                        borderColor="#0000CD"
                        src={currentuser.info?.picture}
                        name={`${currentuser.info?.name}(You)`}
                        fallback={currentuser.info?.name?.[0]}
                    />
                )}

                {user.slice(0,MAX_OTHER_USER).map(({connectionId, info})=>{
                    return(
                        <UserAvatar
                            borderColor={connectionIdtoColors(connectionId)}
                            key={connectionId}
                            src={info?.picture}
                            name={info?.name}
                            fallback={info?.name?.[0] || "T"}
                        />
                    )
                })}

                {hasMoreUser && (
                    <UserAvatar 
                        name={`${user.length - MAX_OTHER_USER } more`}
                        fallback={`+${user.length - MAX_OTHER_USER }`}
                    />
                )}

            </div>
        </div>
    )
}

export const ParticipantsSkeleton = () => {
    return(
        <div
        className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex ite-center shadow-md
        w-[400px] "
        >
           <Skeleton 
           className="h-full w-full bg-muted-400"
           />
        </div>
    )
}