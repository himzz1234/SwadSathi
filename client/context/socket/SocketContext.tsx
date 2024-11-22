import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";
import { AuthContext } from "@/context/auth/AuthContext";

const INITIAL_STATE = {
  socket: undefined,
};

export const SocketContext = createContext(INITIAL_STATE);

export default function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth && auth.name) {
      const sock = io("http://192.168.1.52:8800");
      sock.emit("newconnection", auth._id);
      setSocket(sock);
    }
  }, [auth]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
