import { Receiver } from "./Reciever";


export interface Group {
    id: string;
    name: string;
    description: string;
    members: Receiver[] | null;
    createdAt: string;
}