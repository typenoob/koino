import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import io from "socket.io-client";
export default function useSocket() {
  const { channelId } = useParams();
  const socket = useRef();
  useEffect(() => {
    socket.current = io(`localhost:8888?channel=${channelId}`, {
      transports: ["websocket"],
    });
    socket.current.on("connect", () => {
      console.log("connect");
    });

    socket.current.on("disconnect", () => {
      console.log("disconnect");
    });

    return () => {
      socket.current.off("connect");
      socket.current.off("disconnect");
      socket.current.off("pong");
    };
  }, [channelId]);

  return socket;
}
