import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "expense-tracker-53566.firebaseapp.com",
  projectId: "expense-tracker-53566",
  storageBucket: "expense-tracker-53566.appspot.com",
  messagingSenderId: "956299609687",
  appId: "1:956299609687:web:ef0d51b983225883ccc512",
  measurementId: "G-NGHD57Q0YQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


