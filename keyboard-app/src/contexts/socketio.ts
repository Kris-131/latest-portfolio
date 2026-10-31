import { createContext } from "react";
import type { Socket } from "socket.io-client";

// The original portfolio shares press counts through a live socket server.
// This build has no backend, so the socket stays null: keys, sound and
// animations all work, only the shared press counter stays hidden.
export const SocketContext = createContext<{ socket: Socket | null }>({ socket: null });
