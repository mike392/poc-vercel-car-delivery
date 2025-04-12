import {Firestore, Timestamp} from "@firebase/firestore";
import {Auth} from "@firebase/auth";
import {Messaging} from "@firebase/messaging";

export interface Car {
    id: string;
    carId: string;
    name: string;
    checkpoints: Checkpoint[];
    createdAt: Timestamp;
}

export interface Checkpoint {
    id: string;
    checkpoint: string;
    timestamp: Timestamp;
}

export interface FirebaseComponent {
    db: Firestore;
    auth: Auth;
    messaging: Messaging;
}