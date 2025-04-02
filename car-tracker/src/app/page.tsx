"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
    const [carId, setCarId] = useState("");
    const router = useRouter();

    const handleTrackCar = () => {
        if (!carId) return alert("Please enter a Car ID");
        router.push(`/track/${carId}`);
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
            <div className="mt-6">
                <button onClick={navigateToAdminLogin} className="px-4 py-2 bg-gray-800 text-white rounded">Admin
                    Console
                </button>
            </div>
        </div>
    );
}
