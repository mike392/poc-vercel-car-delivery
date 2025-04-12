"use client";

import "./globals.css";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {getDocs} from "@firebase/firestore";
import {db} from "@poc-car-tracker/app/firebase";
import {collection, query, where} from "firebase/firestore";

export default function Home() {
    const [carId, setCarId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleTrackCar = async () => {
        if (!carId) return alert("Please enter a Car ID");
        // Check if car exists in the database
        const carsCollectionRef = collection(db, "cars");
        const q = query(carsCollectionRef, where("carId", "==", carId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // If car exists, navigate to the track page
            setErrorMessage(""); // Clear any previous error message
            router.push(`/track/${carId}`);
        } else {
            // If car does not exist, show an error message
            setErrorMessage("Car not found. Please check the Car ID.");
        }
    };

    const navigateToAdminLogin = () => {
        router.push("/admin-login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800">Car Tracking System</h1>
            <div className="mt-6 w-full max-w-md">
                <input
                    type="text"
                    placeholder="Enter Car ID"
                    value={carId}
                    onChange={(e) => setCarId(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <button
                    onClick={handleTrackCar}
                    className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Track Car
                </button>
            </div>

            {errorMessage && (
                <div className="mt-4 text-red-500">
                    {errorMessage}
                </div>
            )}
            <div className="mt-6">
                <button onClick={navigateToAdminLogin} className="px-4 py-2 bg-gray-800 text-white rounded">Admin
                    Console
                </button>
            </div>
        </div>
    );
}
