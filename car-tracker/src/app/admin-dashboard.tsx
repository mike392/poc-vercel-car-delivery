import {useState, useEffect} from "react";
import { db } from "./firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import {Car} from "@poc-car-tracker/app/model/types";

export default function AdminDashboard() {
    const [carId, setCarId] = useState("");
    const [checkpoint, setCheckpoint] = useState("");
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "cars"), (snapshot) => {
            setCars(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Car)));
        });
        return () => unsub();
    }, []);

    const addCheckpoint = async () => {
        if (!carId || !checkpoint) return;
        await addDoc(collection(db, "cars"), { carId, checkpoint, timestamp: new Date() });
        setCarId(""); setCheckpoint("");
    };

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
    <input className="border p-2 w-full my-2" type="text" placeholder="Car ID" value={carId} onChange={(e) => setCarId(e.target.value)} />
    <input className="border p-2 w-full my-2" type="text" placeholder="Checkpoint" value={checkpoint} onChange={(e) => setCheckpoint(e.target.value)} />
    <button onClick={addCheckpoint} className="bg-green-500 text-white p-2 w-full">Add Checkpoint</button>

    <h2 className="text-xl mt-6">Cars:</h2>
    {cars.map(car => (
        <div key={car.id} className="border p-2 my-2">{car.carId} - {car.checkpoint.checkpoint}</div>
    ))}
    </div>
);
}
