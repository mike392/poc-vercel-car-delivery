"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {signInWithPopup} from "@firebase/auth";
import {doc, getDoc} from "@firebase/firestore";
import {auth, db, provider} from "@poc-car-tracker/firebase";

interface Admins {
    emails: string[]
}

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const docRef = doc(db, "settings", "adminList");
            const docSnap = await getDoc(docRef);
            setLoading(true);

            if (!docSnap.exists()) {
                alert("Admin list not found.");
                return;
            }

            const allowedAdmins = (docSnap.data() as Admins).emails || [];
            if (!allowedAdmins.includes(user.email!)) {
                alert("Access Denied: You are not an authorized admin.");
                return;
            }

            router.push("/admin-dashboard");
        } catch (err: unknown) {
            // You can check if err is an instance of Error
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                console.error("An unknown error occurred");
            }
            alert("Login failed.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-lg text-center">
                <h2 className="text-xl font-bold mb-4">Admin Login</h2>
                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="bg-blue-500 text-white p-2 px-4 rounded hover:bg-blue-600 transition"
                >
                    {loading ? "Signing in..." : "Login with Google"}
                </button>
            </div>
        </div>
    );
}
