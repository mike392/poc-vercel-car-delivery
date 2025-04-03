import {Firestore} from "@firebase/firestore";
import {Auth} from "@firebase/auth";
import {Messaging} from "@firebase/messaging";

export interface Car {
    id: string;
    carId: string;
    checkpoint: Checkpoint;
}

export interface Checkpoint {
    id: string;
    checkpoint: string;
    timestamp: Date;
}

export interface FirebaseComponent {
    db: Firestore;
    auth: Auth;
    messaging: Messaging;
}