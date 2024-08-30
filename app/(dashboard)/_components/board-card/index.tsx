"use client";

import { useAuth } from '@clerk/nextjs';
import { Overlay } from './overlay';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Footer } from './footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Action } from '@/components/action';
import { MoreHorizontal } from 'lucide-react';
import useApiMutation from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

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
    const createdAtLabel = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

    const { 
        mutate: onFavourite,
        pending: pendingFavourite
    } = useApiMutation(api.board.favourite);

    const {
        mutate: onUnfavourite,
        pending: pendingUnfavourite
    } = useApiMutation(api.board.unFavourite);

    const toggleFavourite = () => {
        if (isFavorite) {
            onUnfavourite({ id })
                .catch(() => toast.error("Failed to unfavourite"));
        } else {
            onFavourite({ id, orgId })
                .catch(() => toast.error("Failed to favourite"));
        }
    };

    return (
        <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
            <div className="relative flex-1 bg-slate-200">
                <Link href={`/board/${id}`} passHref>
                    <div className="relative block">
                        <Image
                            src={imageUrl}
                            alt={title}
                            layout="fill"
                            className="object-cover"
                        />
                        <Overlay />
                        <Action id={id} title={title} side="right">
                            <button 
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"
                                onClick={toggleFavourite} // Added click handler
                            >
                                <MoreHorizontal 
                                    className="text-white opacity-75 hover:opacity-100 transition-opacity"
                                />
                            </button>
                        </Action>
                    </div>
                </Link>
            </div>
            <Footer
                isFavorite={isFavorite}
                title={title}
                authorLabel={authorLabel}
                createdAtLabel={createdAtLabel}
                onClick={toggleFavourite}
                disable={pendingFavourite || pendingUnfavourite}
            />
        </div>
    );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="aspect-[100/127] rounded-lg justify-between overflow-hidden">
            <Skeleton className="h-full w-full" />
        </div>
    );
};
