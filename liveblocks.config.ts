import { createClient, LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { Layers } from "./type/canvas";

const client = createClient({
  throttle: 16,
  authEndpoint: "/api/liveblock-auth",
});

type Presence = {
  cursor: { x: number; y: number } | null;
  selection: string[];
};

type Storage = {
  layers: LiveMap<string, LiveObject<Layers>>
  layerIds: LiveList<string>
};

type BoardItem = {
  id: string;
  type: "sticky" | "shape";
  content: string;
  position: { x: number; y: number };
  // Add more properties as needed
};

type UserMeta = {
  id?: string;
  info?: {
    name?: string;
    picture?: string;
  };
};

type RoomEvent =
  | { type: "CURSOR_UPDATE"; cursor: { x: number; y: number } }
  | { type: "ITEM_UPDATE"; item: BoardItem };

type ThreadMetadata = {
  itemId: string;
  resolved: boolean;
};

export const {
  RoomProvider,
  useMyPresence,
  useStorage,
  useMutation,
  useOthers,
  useUpdateMyPresence,
  useRoom,
  useSelf,
  useThreads,
  useCreateThread,
  useEditThreadMetadata,
  useUser,
  useRoomInfo,
  useHistory,
  useUndo,
  useRedo,
  useCanUndo,
  useCanRedo,
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(client);