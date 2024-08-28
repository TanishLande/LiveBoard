"use client"

import Image from "next/image"
import{
    useOrganization,
    useOrganizationList
} from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { Hint } from "@/components/Hint"

interface ItemProps{
    id: string,
    name: string,
    imageUrl: string,
}

export const Item = ({
    id,name, imageUrl
}: ItemProps ) =>{
    const { organization } = useOrganization();
    const { setActive } = useOrganizationList();

    const isActive = organization?.id === id;

    const onclick = () =>{
        if(!setActive) return;

        setActive({ organization: id }) 
    }

    return(
        <div className="aspect-square relative">
            <Hint
            label={name}
            side="right"
            align="start"
            sideOffset={18}
            >
            <Image
                alt ={name}
                src={imageUrl}
                onClick={onclick}
                className={cn(
                    "rounded-md cursor-pointer opacity-50 hover:opacity-80 transition",
                    isActive && "opacity-100"
                )}
                width={500}
                height={500}
            />
            </Hint>
        </div>
    )
}