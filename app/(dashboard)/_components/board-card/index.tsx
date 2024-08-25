"use client";

import { useAuth } from '@clerk/nextjs';
import { Overlay } from './overlay';
import Image from 'next/image'; // Ensure you're importing Image from 'next/image'
import Link from 'next/link'; // Use Link from 'next/link'
import { formatDistanceToNow } from "date-fns"
import { Footer } from './footer';
import { Skeleton } from '@/components/ui/skeleton';

interface BoardCardProps {
    id: string;
    title: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    createdAt: number;
    orgId: string;
    isFavorite: boolean;
}

export const BoardCard = ({
    id,
    title,
    imageUrl,
    createdAt,
    orgId,
    isFavorite,
    authorId,
    authorName
}: BoardCardProps) => {
    const { userId } = useAuth();

    const authorLabel = userId === authorId ? "You" : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt,{ addSuffix:true });

    return (
        <Link href={`/board/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-slate-200">
                    <Image
                        src={imageUrl}
                        alt={title}
                        layout="fill" // Ensure layout is set for next/image
                        className="object-cover" // 'object-cover' typically used for covering the container
                    />
                    <Overlay />
                </div>
                <Footer 
                 isFavorite ={isFavorite}
                 title ={ title}
                 authorLabel = {authorLabel}
                 createdAtLabel = {createdAtLabel}
                 onClick = {()=>{}}
                 disable ={false}
                />
            </div>
        </Link>
    );
};

BoardCard.Skeleton = function BoardCardSkeleton(){
return(
    <div className="aspect-[100/127] rounded-lg justify-between overflow-hidden">
        <Skeleton className='h-full w-full' />

    </div>
)
}