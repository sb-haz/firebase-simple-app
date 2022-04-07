import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAdJVhN3OaxAtHKMCQfSZ48dtsqR-jAgn8",
    authDomain: "post-maker-f3d4f.firebaseapp.com",
    projectId: "post-maker-f3d4f",
    storageBucket: "post-maker-f3d4f.appspot.com",
    messagingSenderId: "990928462108",
    appId: "1:990928462108:web:0f5d250bea53b4f6e6dad9",
    measurementId: "G-SVC9LQWE9L"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);