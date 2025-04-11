import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: "poc-car-delivery",
    storageBucket: "poc-car-delivery.firebasestorage.app",
    messagingSenderId: "99008820637",
    appId: "1:99008820637:web:bb20ca77a38bbd0ef1eb74"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };

// Lazy messaging
// export const getMessagingIfSupported = async () => {
//     if (typeof window !== "undefined" && "serviceWorker" in navigator) {
//         const { getMessaging, onMessage } = await import("firebase/messaging");
//         const messaging = getMessaging(app);
//
//         onMessage(messaging, (payload) => {
//             console.log("Notification received: ", payload);
//         });
//
//         return messaging;
//     }
//     return null;
// };
