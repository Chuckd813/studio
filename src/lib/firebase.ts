
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
// Uncomment if you need other Firebase services
// import { getStorage, type FirebaseStorage } from 'firebase/storage';
// import { getAnalytics, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
// let storage: FirebaseStorage; // Uncomment if needed
// let analytics: Analytics; // Uncomment if needed

if (!getApps().length) {
  // Ensure all required config values are present before initializing
  if (
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
  ) {
    app = initializeApp(firebaseConfig);
  } else {
    console.error(
      'Firebase configuration is missing. Ensure all NEXT_PUBLIC_FIREBASE_ environment variables are set.'
    );
    // You might want to throw an error here or handle this case appropriately
    // For now, we'll let it proceed, but Firebase services will likely fail.
    // A dummy app could be created to prevent crashes if getAuth/getFirestore are called.
    // However, it's better to ensure config is present.
  }
} else {
  app = getApp();
}

// Initialize services only if app was successfully initialized
if (app!) {
  auth = getAuth(app);
  db = getFirestore(app);
  // storage = getStorage(app); // Uncomment if needed

  // Ensure Analytics is only initialized on the client side
  // if (typeof window !== 'undefined') {
  //   if (firebaseConfig.measurementId) {
  //     analytics = getAnalytics(app);
  //   }
  // }
} else {
  // Fallback for auth and db if app is not initialized to prevent runtime errors
  // This is a basic fallback; ideally, the app should not run without proper Firebase config.
  console.warn("Firebase app not initialized. Auth and Firestore services will not be available.");
  // @ts-ignore
  auth = undefined;
  // @ts-ignore
  db = undefined;
}


export { app, auth, db /*, storage, analytics */ };
