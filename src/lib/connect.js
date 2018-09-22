import io from "socket.io-client";
import { WEBSOCKET_URL } from "./../../env";

export default function connect() {
  const socket = io(WEBSOCKET_URL);
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });  
  });
}
