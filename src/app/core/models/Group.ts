import { Receiver } from "./Reciever";


export interface Group {
    id: number;
    name: string;
    description: string;
    members: Receiver[] | null;
    createdAt: string;
}