import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { FirestoreCollections } from "../enums/firestore-collections";

@Injectable({
  providedIn: "root",
})
export class EntrepotService {
  private firestore: Firestore = inject(Firestore);


  getAllEntrepot(): Observable<any[]> {
    const usersCollection = collection(this.firestore, FirestoreCollections.entrepots);
    return collectionData(usersCollection, { idField: 'id' });
  }

  async createEntrepot(userData: any): Promise<{ status: string; message: string; Id?: string }> {
    try {
      const usersCollection = collection(this.firestore, FirestoreCollections.entrepots);
      const newDocRef = doc(usersCollection); 
      await setDoc(newDocRef, userData);
      return { 
        status: 'success', 
        message: 'Entrepot créé avec succès!', 
        Id: newDocRef.id 
      };
    } catch (error) {
      return { 
        status: 'error', 
        message: 'Échec de la création de l\'entrepot. Veuillez réessayer.' 
      };
    }
  }

  async updateEntrepot(id: string, userData: any): Promise<{ status: string; message: string }> {
    try {
      const userDoc = doc(this.firestore, `${FirestoreCollections.entrepots}/${id}`);
      await updateDoc(userDoc, userData);
      return { 
        status: 'success', 
        message: 'Entrepot mis à jour avec succès!' 
      };
    } catch (error) {
      return { 
        status: 'error', 
        message: 'Échec de la mise à jour de l\'entrepot. Veuillez réessayer.' 
      };
    }
  }

  async deleteEntrepot(id: string): Promise<{ status: string; message: string }> {
    try {
      const userDoc = doc(this.firestore, `${FirestoreCollections.entrepots}/${id}`);
      await deleteDoc(userDoc);
      return { 
        status: 'success', 
        message: 'Entrepot supprimé avec succès!' 
      };
    } catch (error) {
      return { 
        status: 'error', 
        message: 'Échec de la suppression de l\'entrepot. Veuillez réessayer.' 
      };
    }
  }
}

