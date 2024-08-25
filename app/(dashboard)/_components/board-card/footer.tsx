import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FooterProps {
    isFavorite : boolean;
    title : string;
    authorLabel : string;
    createdAtLabel : string;
    onClick : () => void;
    disable : boolean;
}

export const Footer = ({
    isFavorite, title , authorLabel, createdAtLabel, onClick,disable
}: FooterProps) =>{
    return(
            <div className="relative bg-slate-200 p-3">
                <p className="text-[13px] truncate max-w-[calc(100%-20px)]">
                    {title}
                </p>

                <p className="opacity-0 group-hover:opacity-100 translate-opacity text-[11px] text-muted-foreground truncate ">
                    {authorLabel}, {createdAtLabel}
                </p>
                <button 
                 disabled={disable}
                 onClick={onClick}
                 className={cn(
                    "opacity-0 group-hover:opacity-100 trasition absolute top-3 right-3 text-muted-foreground hover:text-blue-600",
                    disable && "cursor-not-allowed opacity-75"
                )}
                >
                    <Star
                     className={cn("h-4 w-4",
                        isFavorite && "fill-blue-600"
                     )}

                    />
                </button>
            </div>
    )
}