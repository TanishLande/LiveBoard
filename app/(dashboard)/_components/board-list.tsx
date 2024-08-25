"use client";

import EmptyBoard from "./empty-board";
import EmptyFav from "./empty-fav";
import EmptySearch from "./empty-search";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BoardCard } from "./board-card";
import { BoardButton } from "./board-button";

interface BoardListProps {
  orgId?: string;
  query?: {
    search?: string;
    favorites?: string;
  };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId: orgId || "" });

  if (data === undefined) {
    return (
      <>
        <h2 className="text-3xl">
          {query?.favorites ? "Favourite boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 dm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <BoardButton orgId={orgId} disabled />
          {/* Render 5 skeletons */}
          {[...Array(5)].map((_, index) => (
            <BoardCard.Skeleton key={index} />
          ))}
        </div>
      </>
    );
  }

  if (!data?.length && query?.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query?.favorites) {
    return <EmptyFav />;
  }

  if (!data?.length) {
    return <EmptyBoard />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {query?.favorites ? "Favourite boards" : "Team boards"}
      </h2>
      <div className="grid grid-cols-1 dm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <BoardButton orgId={orgId} />
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={false}
          />
        ))}
      </div>
    </div>
  );
};
