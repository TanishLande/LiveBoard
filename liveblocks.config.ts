import { createClient, LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { Layers } from "./type/canvas";

const client = createClient({
  throttle: 16,
  authEndpoint: "/api/liveblock-auth"
});

// Presence represents the properties that will exist on every User in the Room
// and that will automatically be kept in sync. Accessible through the `user.presence` property.
type Presence = {
  cursor: { x: number; y: number } | null;
  selection: string[];
};

// Storage represents the shared document that persists in the Room, even after all Users leave.
// Fields under Storage typically are LiveList, LiveMap, LiveObject instances, for which updates are automatically persisted and synced to all connected clients.
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

// UserMeta represents static/readonly metadata on each User, as provided by your own custom auth backend (if used).
// Useful for data that will not change during a session, like a User's name or avatar.
type UserMeta = {
  id?: string;
  info?: {
    name?: string;
    picture?: string;
  };
};

// Optionally, RoomEvent can be used to define the data shape of custom events emitted 
// and listened for using room.broadcastEvent and room.subscribe("my-event", callback).
type RoomEvent = 
  | { type: "CURSOR_UPDATE"; cursor: { x: number; y: number } }
  | { type: "ITEM_UPDATE"; item: BoardItem };

// Optionally, customize the type of custom thread metadata.
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
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(client);