"use client";

import { useState, useEffect, use } from "react";
import { db } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {Checkpoint} from "@poc-car-tracker/app/model/types";

interface Props {
    params: Promise<{ carId: string }>;
}

export default function TrackCar({ params }: Props) {
    const { carId } = use(params);
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);

    useEffect(() => {
        if (!carId) return;
        const q = query(collection(db, "cars"), where("carId", "==", carId));
        const unsub = onSnapshot(q, (snapshot) => {
            setCheckpoints(snapshot.docs.map(doc => {
                const data = doc.data();
                console.log(data)
                return [...data.checkpoints as Checkpoint[]] as Checkpoint[]
            }).flat());
        });
        return () => unsub();
    }, [carId]);

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold">Tracking Car: {carId}</h1>
    {checkpoints.map((cp, i) => (
        <div key={i} className="border p-2 my-2">{cp.checkpoint} - {cp.timestamp.toDate().toLocaleString()}</div>
    ))}
    </div>
);
}
