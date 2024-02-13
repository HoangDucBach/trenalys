import {Server, Socket} from "socket.io";

export interface IServerToClientEvents {
    noArg: () => void;
}

export interface IClientToServerEvents {
    noArg: () => void;
}

export interface ISocketData {
    name: string;
    age: number;
}

export class SocketServer {
    private readonly io: any = new Server<
        IClientToServerEvents,
        IServerToClientEvents,
        ISocketData>();

    constructor() {
        this.io.on("connection", (socket:Socket) => {
            socket.on("noArg", () => {
                this.io.emit("noArg");
            });
        });
    }

}