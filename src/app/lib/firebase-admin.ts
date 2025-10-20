// app/lib/firebase-admin.ts
import * as admin from 'firebase-admin';


// Ensure the environment variable is set
if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON environment variable is not set.');
}

// Parse the service account key from the environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON as string);

/**
 * Initialize Firebase Admin SDK
 *
 * We check if admin.apps.length is zero before initializing.
 * This prevents re-initializing the app on every hot-reload in development,
 * which would cause errors.
 */
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // Add your databaseURL if needed, e.g.:
        // databaseURL: 'https://<YOUR_PROJECT_ID>.firebaseio.com'
    });
}

/**
 * Export the initialized Firestore database instance.
 * You will import 'db' in your API route (app/api/parse-resume/route.ts)
 * to interact with your database.
 */
const db = admin.firestore();

export { db };