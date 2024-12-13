import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Asegúrate de importar ConfigService
import { firebaseDatabase } from 'src/config/firestore.config'; // Asegúrate de que la configuración esté correcta
import { collection, addDoc, getDocs } from 'firebase/firestore';

@Injectable()
export class AppService {
  private db;

  constructor(private configService: ConfigService) {
    // Inicializamos Firebase usando el configService
    this.db = firebaseDatabase(this.configService); // Pasamos configService aquí
  }

  // Obtener datos desde Firestore
  async getUsers() {
    try {
      const querySnapshot = await getDocs(collection(this.db, 'users'));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    } catch (error) {
      console.error('Error obteniendo usuarios', error);
    }
  }

  // Crear nuevos datos en Firestore
  async createUser(data: any): Promise<void> {
    try {
      const docRef = await addDoc(collection(this.db, 'User'), data);
      console.log('Usuario creado con el id', docRef.id); 
    } catch (error) {
      console.error('Error creando usuario', error);
    }
  }

  async createPoint(data: any): Promise<void> {
    try {
      const docRef = await addDoc(collection(this.db, 'MoTPoint'), data);
      console.log('Punto Creado con exito', docRef.id); 
    } catch (error) {
      console.error('Punto no creado', error);
    }
  }

  async getPoints() {
    try {
      const querySnapshot = await getDocs(collection(this.db, 'MoTPoint'));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    } catch (error) {
      console.error('Error obteniendo puntos', error);
    }
  }







}
