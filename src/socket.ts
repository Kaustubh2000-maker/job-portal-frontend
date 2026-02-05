import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = () => {
  console.log("🧩 connectSocket() called");

  socket = io("http://localhost:3000", {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("🟢 Socket connected:", socket?.id);
  });

  socket.on("connect_error", (err) => {
    console.error("🔴 Socket connect error:", err.message);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected");
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
