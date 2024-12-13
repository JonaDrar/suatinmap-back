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
  async getData() {
    try {
      const querySnapshot = await getDocs(collection(this.db, 'users'));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    } catch (error) {
      console.error('Error obteniendo datos', error);
    }
  }

  // Crear nuevos datos en Firestore
  async createData(data: any): Promise<void> {
    try {
      const docRef = await addDoc(collection(this.db, 'User'), data);
      console.log('Usuario creado con el id', docRef.id); 
    } catch (error) {
      console.error('Error creando datos', error);
    }
  }
}
