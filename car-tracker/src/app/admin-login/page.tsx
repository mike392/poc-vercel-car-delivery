"use client";

import {FormEvent, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Auth, UserCredential} from "@firebase/auth";
import {DocumentData, DocumentReference, DocumentSnapshot, Firestore} from "@firebase/firestore";

interface Admins {
    emails: string[]
}

let auth: Auth, db: Firestore, signInWithEmailAndPassword: (auth: Auth, email: string, password: string) => Promise<UserCredential>,
    doc: (firestore: Firestore, path: string, ...pathSegments: string[]) => DocumentReference<DocumentData, DocumentData>,
    getDoc: (reference: DocumentReference) => Promise<DocumentSnapshot>;

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        import("../firebase").then(async fb => {
            db = fb.db;
            auth = fb.auth;
            signInWithEmailAndPassword = (await import("firebase/auth")).signInWithEmailAndPassword;
            doc = (await import("firebase/firestore")).doc;
            getDoc = (await import("firebase/firestore")).getDoc;
        });
    }, []);


    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        // Step 1: Get admin list from Firestore
        const docRef = doc(db, "settings", "adminList");
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            alert("Admin list not found.");
            return;
        }

        const allowedAdmins = (docSnap.data() as Admins).emails || [];
        if (!allowedAdmins.includes(email)) {
            alert("Access Denied: You are not an authorized admin.");
            return;
        }

        // Step 2: Proceed with Firebase Auth Login
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/admin-dashboard");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Admin Login</h2>
                <input className="border p-2 w-full mb-2" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input className="border p-2 w-full mb-4" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
            </form>
        </div>
    );
}
