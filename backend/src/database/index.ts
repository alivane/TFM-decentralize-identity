import dotenv from "dotenv";
import admin from 'firebase-admin';
import 'firebase/database';

dotenv.config();

const GCP_SERVICE_ACCOUNT = JSON.parse(process.env.GCP_SERVICE_ACCOUNT || "{}");
const DATABASE = process.env.DATABASE || "";

// Initialize Firebase Admin
admin.initializeApp({
  // credential: admin.credential.applicationDefault(),
  credential: admin.credential.cert(GCP_SERVICE_ACCOUNT as admin.ServiceAccount),
  databaseURL: DATABASE
});


const db = admin.database(); // get the Firestore instance

export { db };
export default db;
