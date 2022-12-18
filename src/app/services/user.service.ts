import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {UserModel} from '../models/user.model';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private collectionName: string = 'users';
  constructor(private afs: AngularFirestore) { }
  
  collection = () => this.afs.collection<UserModel>(this.collectionName);
  
  createUser = async (user : UserModel) => this.collection().doc(user.uid).set(user)
  
  deleteUser = async (userId: string) => this.collection().doc(userId).delete();
  
  updateUser = async (user: UserModel) => this.collection().doc(user.email).update({...user});
  
  getUser = async (userId: string) => lastValueFrom(this.collection().doc(userId).get({source: 'cache'}));
  
  listUsers = async () => this.collection().valueChanges();
}
