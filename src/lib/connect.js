import io from "socket.io-client";

const SOCKET_URL = 'http://10.0.0.4:8080';

export default function connect() {
  const socket = io(SOCKET_URL);
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });  
  });
}
