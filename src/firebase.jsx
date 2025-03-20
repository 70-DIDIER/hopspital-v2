// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth"; // Import Firebase Auth
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw8PTRKDOi4dktGocgrWe3J9zcFBymOiQ",
  authDomain: "peehospital-dba8f.firebaseapp.com",
  projectId: "peehospital-dba8f",
  storageBucket: "peehospital-dba8f.firebasestorage.app",
  messagingSenderId: "760611736291",
  appId: "1:760611736291:web:62838d27d565b5e19c93d6"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialisation de l'authentification
export { auth }; // On exporte auth pour l'utiliser ailleurs
export default app;