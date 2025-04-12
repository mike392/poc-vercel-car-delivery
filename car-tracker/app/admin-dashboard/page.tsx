"use client";

import {useEffect, useState} from "react";
import {auth, db} from "../firebase";
import {addDoc, arrayUnion, collection, onSnapshot, updateDoc} from "firebase/firestore";
import {Car} from "@poc-car-tracker/model/types";
import {doc} from "@firebase/firestore";
import {useRouter} from "next/navigation";
import {onAuthStateChanged, User} from "@firebase/auth";

export default function Page() {
    const [, setUser] = useState<User | null>(null);
    const [carId, setCarId] = useState("");
    const [newCarName, setNewCarName] = useState("");
    const [cars, setCars] = useState<Car[]>([]);
    const [selectedCarId, setSelectedCarId] = useState("");
    const [checkpointText, setCheckpointText] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Check if the user is authenticated
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                // If the user is not logged in, redirect to login page
                router.push("/admin-login");
            } else {
                // If the user is authenticated, set the user object
                setUser(user);
                console.log("user is authorized ", user.email)
            }
        });

        // Cleanup the subscription on component unmount
        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "cars"), (snapshot) => {
            setCars(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as Car)));
        });
        return () => unsub();
    }, []);

    // Create a new car
    const createCar = async () => {
        if (!carId || !newCarName) return;
        await addDoc(collection(db, "cars"), {
            carId,
            name: newCarName,
            checkpoints: [],
            createdAt: new Date()
        });
        setCarId("");
        setNewCarName("");
    };

    // Add a checkpoint to existing car
    const addCheckpoint = async () => {
        if (!selectedCarId || !checkpointText) return;
        const carRef = doc(db, "cars", selectedCarId);
        await updateDoc(carRef, {
            checkpoints: arrayUnion({
                checkpoint: checkpointText,
                timestamp: new Date()
            })
        });
        setCheckpointText("");
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            {/* New Car Form */}
            <div className="mb-8">
                <h2 className="text-xl mb-2">Create New Car</h2>
                <input
                    className="border p-2 w-full mb-2"
                    type="text"
                    placeholder="Car ID"
                    value={carId}
                    onChange={(e) => setCarId(e.target.value)}
                />
                <input
                    className="border p-2 w-full mb-2"
                    type="text"
                    placeholder="Car Name"
                    value={newCarName}
                    onChange={(e) => setNewCarName(e.target.value)}
                />
                <button onClick={createCar} className="bg-blue-500 text-white p-2 w-full">
                    Create Car
                </button>
            </div>

            {/* Checkpoint Form */}
            <div className="mb-8">
                <h2 className="text-xl mb-2">Add Checkpoint</h2>
                <select
                    className="border p-2 w-full mb-2"
                    value={selectedCarId}
                    onChange={(e) => setSelectedCarId(e.target.value)}
                >
                    <option value="">Select Car</option>
                    {cars.map((car) => (
                        <option key={car.id} value={car.id}>
                            {car.carId}
                        </option>
                    ))}
                </select>
                <input
                    className="border p-2 w-full mb-2"
                    type="text"
                    placeholder="Checkpoint"
                    value={checkpointText}
                    onChange={(e) => setCheckpointText(e.target.value)}
                />
                <button onClick={addCheckpoint} className="bg-green-500 text-white p-2 w-full">
                    Add Checkpoint
                </button>
            </div>

            {/* Car List */}
            <h2 className="text-xl mb-2">All Cars</h2>
            {cars.map((car) => (
                <div key={car.id} className="border p-2 mb-2">
                    <strong>{car.carId}</strong> - {car.name}
                    <ul className="ml-4 mt-2 list-disc">
                        {car.checkpoints?.map((cp, idx) => (
                            <li key={idx}>{cp.checkpoint}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
