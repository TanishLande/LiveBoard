import { Skeleton } from "@/components/ui/skeleton"

export const Participants = () =>{
    return(
        <div
        className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex ite-center shadow-md
        "
        >
            List of user 
        </div>
    )
}

Participants.Skeletion = function ParticipantsSkeleton() {
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