import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { ConfigService } from '@nestjs/config';

// Configuración de Firebase utilizando ConfigService
export const firebaseConfig = (configService: ConfigService) => ({
  apiKey: configService.get('API_KEY'),
  authDomain: configService.get('AUTH_DOMAIN'),
  projectId: configService.get('PROJECT_ID'),
  storageBucket: configService.get('STORAGE_BUCKET'),
  messagingSenderId: configService.get('MESSAGING_SENDER_ID'),
  appId: configService.get('APP_ID'),
  measurementId: configService.get('MEASUREMENT_ID'),
});

// Función para inicializar Firebase y obtener Firestore
export const firebaseDatabase = (configService: ConfigService) => {
  const app = initializeApp(firebaseConfig(configService));
  return getFirestore(app);
};