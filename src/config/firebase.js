import dotenv from 'dotenv';
dotenv.config();
import admin from 'firebase-admin';
import logger from './logger.js';

let firebaseApp;

try {
  console.log("laaaaaaaaaaaaa");
    console.log(process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'));

  const serviceAccount = {
    type: "service_account",
    project_id: "higher-2fad1",
    private_key_id: "9436832d0e3843227fc3c14958723e447993e76d",
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: "firebase-adminsdk-fbsvc@higher-2fad1.iam.gserviceaccount.com",
    client_id: "102602986504404831660",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/..."
  };

  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  logger.info('🔥 Firebase initialized successfully');
} catch (error) {
  logger.error('❌ Firebase init failed:', error);
}

export const getMessaging = () => {
  if (!firebaseApp) {
    throw new Error('Firebase is not initialized');
  }
  return admin.messaging();
};

export default firebaseApp;
