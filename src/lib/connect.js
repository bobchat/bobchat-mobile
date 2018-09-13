import io from "socket.io-client";

const SOCKET_URL = "http://192.168.1.36:8080";

export default function connect() {
  const socket = io(SOCKET_URL);
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });  
  });
}
