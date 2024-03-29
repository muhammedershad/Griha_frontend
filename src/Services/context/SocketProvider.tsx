import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { Socket, io } from "socket.io-client";

interface SocketProviderProps {
    children: ReactNode;
}

const SocketContext = createContext<Socket | null>(null);

export const useSocket = (): Socket | null => {
    const socket = useContext(SocketContext);
    return socket;
};

export const SocketProvider: React.FC<SocketProviderProps> = (props) => {
    const socket = useMemo(() => io(import.meta.env.VITE_SOCKET_IO_URL), []);  

    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    );
};
