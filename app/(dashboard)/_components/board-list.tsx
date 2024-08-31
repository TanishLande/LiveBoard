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
    favorites?: string; // Keep this as 'favorites' to match URL parameter
  };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  // Convert 'favorites' to 'isFavorite' for the API call
  const apiQuery = {
    orgId: orgId || "",
    ...(query?.search ? { search: query.search } : {}),
    ...(query?.favorites ? { isFavorite: query.favorites } : {}),
  };

  const data = useQuery(api.boards.get, apiQuery);

  const isFavoriteView = query?.favorites === "true";

  if (data === undefined) {
    return (
      <>
        <h2 className="text-3xl">
          {isFavoriteView ? "Favourite boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <BoardButton orgId={orgId} disabled />
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

  if (!data?.length && isFavoriteView) {
    return <EmptyFav />;
  }

  if (!data?.length) {
    return <EmptyBoard />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {isFavoriteView ? "Favourite boards" : "Team boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
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
            isFavorite={board.isFavourite}
          />
        ))}
      </div>
    </div>
  );
};