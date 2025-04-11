import { db } from "../firebase";
import {collection, limit, query, where} from "firebase/firestore";
import {getDocs} from "@firebase/firestore";
import {Car} from "@poc-car-tracker/app/model/types";

export async function getCarData(carId: string): Promise<Car | null> {
    if (!carId) {
        return null;
    }
    const carsRef = collection(db, "cars");
    const q = query(carsRef, where("carId", "==", carId), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return null;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Car;
}