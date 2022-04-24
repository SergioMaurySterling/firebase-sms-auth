// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADVz4_lVHwrtlR4VIEfLxoZGvtwihH_Ho",
  authDomain: "moofinder-eb6c4.firebaseapp.com",
  projectId: "moofinder-eb6c4",
  storageBucket: "moofinder-eb6c4.appspot.com",
  messagingSenderId: "933822731981",
  appId: "1:933822731981:web:46eefe5915d1c526d57b84",
  measurementId: "G-0LLZST4K9N"
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const db = getFirestore()
const storage = getStorage()
const analytics = getAnalytics()
const auth = getAuth()

export { app, db, storage, analytics, auth }