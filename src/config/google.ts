import config from "./config"
export const MAPS_API_KEY = config.google.maps.MAPS_API_KEY

export const FIREBASE_API_KEY = config.google.firebase.FIREBASE_API_KEY

export const FIREBASE_AUTH_DOMAIN = config.google.firebase.AUTH_DOMAIN

export const FIREBASE_DATABASE_URL = config.google.firebase.DATABASE_URL

export const FIREBASE_PROJECT_ID = config.google.firebase.PROJECT_ID

export const FIREBASE_STORAGE_BUCKET = config.google.firebase.STORAGE_BUCKET

export const FIREBASE_MESSAGING_SENDER_ID =
  config.google.firebase.MESSAGING_SENDER_ID

export const FIREBASE_APP_ID = config.google.firebase.APP_ID

export const FIREBASE_CONFIG = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID
}
