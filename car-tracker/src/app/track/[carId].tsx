import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {Checkpoint} from "@poc-car-tracker/app/model/types";

export default function TrackCar() {
    const router = useRouter();
    const { carId } = router.query;
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);

    useEffect(() => {
        if (!carId) return;
        const q = query(collection(db, "cars"), where("carId", "==", carId));
        const unsub = onSnapshot(q, (snapshot) => {
            setCheckpoints(snapshot.docs.map(doc => doc.data() as Checkpoint));
        });
        return () => unsub();
    }, [carId]);

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold">Tracking Car: {carId}</h1>
    {checkpoints.map((cp, i) => (
        <div key={i} className="border p-2 my-2">{cp.checkpoint} - {new Date(cp.timestamp.getSeconds() * 1000).toLocaleString()}</div>
    ))}
    </div>
);
}
