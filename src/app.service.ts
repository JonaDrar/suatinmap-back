import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Asegúrate de importar ConfigService
import { firebaseDatabase } from 'src/config/firestore.config'; // Asegúrate de que la configuración esté correcta
import { collection, addDoc, getDocs, query, where, updateDoc, doc, getDoc } from 'firebase/firestore';

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
      // Generar campos normalizados
      data.normalizedName = data.name
          .toLowerCase()
          .split(' ')
          .filter(word => word.length > 0);
      data.normalizedAddress = data.address
          .toLowerCase()
          .split(' ')
          .filter(word => word.length > 0);

      // Validamos rrss como un objeto, por si se envía vacío
      if (!data.rrss) {
        data.rrss = {};
      }

      // Verificar estado activo según las fechas
      if (data.activationStartDate && data.activationEndDate) {
        const startDate = data.activationStartDate ? new Date(data.activationStartDate + 'T00:00:00Z') : null;
        const endDate = data.activationEndDate ? new Date(data.activationEndDate + 'T00:00:00Z') : null;
  
        if (endDate < startDate) {
          throw new Error('La fecha de término debe ser igual o mayor a la fecha de inicio.');
        }
  
        const now = new Date();
        data.isActive = now >= startDate && now <= endDate;
      } else {
        data.isActive = false; // Por defecto, si no hay fechas, no está activo
      }

      const docRef = await addDoc(collection(this.db, 'MoTPoint'), data);
      console.log('Punto Creado con exito', docRef.id); 
    } catch (error) {
      console.error('Punto no creado', error);
      throw new Error('No se pudo crear el punto');
    }
  }

  // Método para normalizar texto
  private normalizeText(text: string): string[] {
    if (!text) return [];
    return text
      .toLowerCase()
      .split(/[\s,]+/)
      .filter((word) => word.trim().length > 0);
  }

  async  getFilteredPoints(filters:any){
    try {
        let pointCollection = collection(this.db, 'MoTPoint');
        let conditions =[];
        
        if(filters.name){
          const keywords = this.normalizeText(filters.name);
          conditions.push(where('normalizedName', 'array-contains-any', keywords));
        }
        if(filters.description){
          conditions.push(where('description','==',filters.description));
        }
        if(filters.address){
          const keywords = this.normalizeText(filters.address);
          conditions.push(where('normalizedAddress', 'array-contains-any', keywords));
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
        // Filtrar por Facebook
        if (filters.facebook) {
          conditions.push(where('rrss.facebook', '==', filters.facebook));
        }

        // Filtrar por Instagram
        if (filters.instagram) {
            conditions.push(where('rrss.instagram', '==', filters.instagram));
        }

        // Filtrar por Twitter
        if (filters.twitter) {
            conditions.push(where('rrss.twitter', '==', filters.twitter));
        }

        // Filtrar por "other" (otras redes sociales)
        if (filters.other) {
            conditions.push(where('rrss.other', '==', filters.other));
        }

        if (filters.phone) {
          conditions.push(where('phone', '==', filters.phone));
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

      // Validar y actualizar rrss
      if (data.rrss) {
        const rrssUpdates: Record<string, any> = {};
        if (data.rrss.facebook !== undefined) {
          rrssUpdates['rrss.facebook'] = data.rrss.facebook;
        }
        if (data.rrss.instagram !== undefined) {
          rrssUpdates['rrss.instagram'] = data.rrss.instagram;
        }
        if (data.rrss.twitter !== undefined) {
          rrssUpdates['rrss.twitter'] = data.rrss.twitter;
        }
        if (data.rrss.other !== undefined) {
          rrssUpdates['rrss.other'] = data.rrss.other;
        }

        if (Object.keys(rrssUpdates).length > 0) {
          await updateDoc(pointDocRef, rrssUpdates);
        }

        delete data.rrss;
      }

      // Validar y actualizar teléfono
      if (data.phone) {
        await updateDoc(pointDocRef, { phone: data.phone });
        delete data.phone;
      }

      // Generar y actualizar campos normalizados si es necesario
      if (data.name) {
        data.normalizedName = this.normalizeText(data.name);
      }
      if (data.address) {
        data.normalizedAddress = this.normalizeText(data.address);
      }

      // Obtener el documento actual para validar fechas y recalcular isActive
      const currentDoc = await getDoc(pointDocRef);
      if (!currentDoc.exists()) {
        throw new Error('El punto especificado no existe.');
      }

      const currentData = currentDoc.data();

      // Normalizar fechas si se envían
    if (data.activationStartDate) {
      data.activationStartDate = new Date(data.activationStartDate + 'T00:00:00Z').toISOString();
    }
    if (data.activationEndDate) {
      data.activationEndDate = new Date(data.activationEndDate + 'T00:00:00Z').toISOString();
    }

    // Validar que la fecha de término sea mayor o igual a la de inicio
    if (data.activationStartDate && data.activationEndDate) {
      const startDate = new Date(data.activationStartDate);
      const endDate = new Date(data.activationEndDate);

      if (endDate < startDate) {
        throw new Error('La fecha de término debe ser igual o mayor a la fecha de inicio');
      }
    }

    // Actualizar estado activo si se modifican las fechas
    if (data.activationStartDate || data.activationEndDate) {
      const now = new Date();
      const startDate = data.activationStartDate ? new Date(data.activationStartDate) : null;
      const endDate = data.activationEndDate ? new Date(data.activationEndDate) : null;

      let isActive = false;
      if (startDate && endDate) {
        isActive = now >= startDate && now <= endDate;
      } else if (startDate && now >= startDate) {
        isActive = true;
      } else if (endDate && now > endDate) {
        isActive = false;
      }

      data.isActive = isActive;
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

  async checkAndUpdatePoints(): Promise<void> {
    try {
      const pointCollection = collection(this.db, 'MoTPoint');
      const q = query(pointCollection, where('deleted', '==', false));
      const querySnapshot = await getDocs(q);

      const now = new Date();

      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data();
        const startDate = data.activationStartDate ? new Date(data.activationStartDate + 'T00:00:00Z') : null;
        const endDate = data.activationEndDate ? new Date(data.activationEndDate + 'T00:00:00Z') : null;

        let isActive = false;
        if (startDate && endDate) {
          isActive = now >= startDate && now <= endDate;
        } else if (startDate && now >= startDate) {
          isActive = true;
        } else if (endDate && now > endDate) {
          isActive = false;
        }

        if (data.isActive !== isActive) {
          await updateDoc(docSnap.ref, { isActive });
          console.log(`Punto con ID ${docSnap.id} actualizado: isActive = ${isActive}`);
        }
      }
    } catch (error) {
      console.error('Error verificando y actualizando puntos', error);
    }
  }
}

