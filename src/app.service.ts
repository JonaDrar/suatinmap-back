import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Asegúrate de importar ConfigService
import { firebaseDatabase } from 'src/config/firestore.config'; // Asegúrate de que la configuración esté correcta
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

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
      const querySnapshot = await getDocs(collection(this.db, 'User'));
      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        delete data.pass;
        delete data.delete;
        return {
          id: doc.id,
          ...data,
        };
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

  async  getFilteredPoints(filters:any){
    try {
        let pointCollection = collection(this.db, 'MoTPoint');
        let conditions =[];
        if(filters.name){
        conditions.push(where('name','==',filters.name));
        }
        if(filters.description){
          conditions.push(where('description','==',filters.description));
        }
        if(filters.address){
          conditions.push(where('address','==',filters.address));
        }
        if (filters.services && filters.services.length > 0) {
          conditions.push(where('services', 'array-contains-any', filters.services));
        }
        if(filters.region){
          conditions.push(where('region','==',filters.region));
        }
        if(filters.commune){
          conditions.push(where('commune','==',filters.commune));
        }
        if(filters.latitud !== undefined){
          conditions.push(where('latitud','==',filters.latitud));
        }
        if(filters.longitude !== undefined){
          conditions.push(where('longitude','==',filters.longitude));
        }
        if(filters.highlighted !== undefined){
          conditions.push(where('highlighted','==',filters.highlighted));
        }
        if(filters.type){
          conditions.push(where('type','==',filters.type));
        }
        if(filters.galleryName){
          conditions.push(where('gallery.galleryName','==',filters.galleryName))
        }
        if(filters.localNumber){
          conditions.push(where('gallery.localNumber','==',filters.localNumber))
        }
          

        const q = query(pointCollection,...conditions,where('deleted', '==', false));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => {
          const data = doc.data();
          delete data.deleted;
          return {
            id: doc.id,
            ...data,
          };
        });

      } catch (error) {
      console.error('Error obteniendo puntos filtrados', error);
      throw new Error('No se pudieron obtener los puntos filtrados');
    }
  }

  async getPoints() {
    try {
      const pointCollection = collection(this.db, 'MoTPoint');
      const q = query(pointCollection,where('deleted', '==', false));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        delete data.deleted;
        return {
          id: doc.id,
          ...data,
        };
      });

    } catch (error) {
      console.error('Error obteniendo puntos', error);
      throw new Error('No se pudieron obtener los puntos');
    }
  }

  async updatePoint(id: string, data: any): Promise<void> {
    try {
      const pointDocRef = doc(this.db, 'MoTPoint', id);

      if (data.gallery) {
        const galleryUpdates: Record<string, any> = {};
        if (data.gallery.localNumber !== undefined) {
          galleryUpdates['gallery.localNumber'] = data.gallery.localNumber;
        }
        if (data.gallery.galleryName !== undefined) {
          galleryUpdates['gallery.galleryName'] = data.gallery.galleryName;
        }

        if (Object.keys(galleryUpdates).length > 0) {
          await updateDoc(pointDocRef, galleryUpdates);
        }

        delete data.gallery;
      }
      await updateDoc(pointDocRef, data);
      console.log(`Punto con ID ${id} actualizado con éxito.`);
    } catch (error) {
      console.error('Error actualizando datos', error);
      throw new Error('No se pudieron actualizar los datos');
    }
  }

  async deletePoint(id: string): Promise<void> {
    try {
      const pointDocRef = doc(this.db, 'MoTPoint', id);
      await updateDoc(pointDocRef, { deleted: true });
      console.log(`Punto con ID ${id} marcado como eliminado.`);
    } catch (error) {
      console.error(`Error al marcar el punto como eliminado: ${error}`);
      throw new Error('No se pudo marcar el punto como eliminado.');
    }
  }
}

