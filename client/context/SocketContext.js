import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

const INITIAL_STATE = {
  socket: undefined,
};

export const SocketContext = createContext(INITIAL_STATE);

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth) {
      setSocket(io("http://192.168.43.173:8800"));
    }
  }, [auth]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
