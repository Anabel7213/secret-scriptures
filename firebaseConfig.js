import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBJ7ZeIKzP-RWSjYlU31Kmjl8GjTY0dDv0",
  authDomain: "mysecretscriptures.firebaseapp.com",
  projectId: "mysecretscriptures",
  storageBucket: "mysecretscriptures.appspot.com",
  messagingSenderId: "364313507988",
  appId: "1:364313507988:web:fa92c02a08bf2c80781c81",
  measurementId: "G-V90TXYS5RX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)