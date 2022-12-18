import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {BehaviorSubject} from 'rxjs';
import firebase from 'firebase/compat';
import {UserModel} from '../models/user.model';
import {UserService} from './user.service';
import User = firebase.User;
import UserCredential = firebase.auth.UserCredential;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	
	public userAuth$: BehaviorSubject<User | undefined> = new BehaviorSubject<firebase.User | undefined>(undefined);
	private collectionName: string = 'users';
	private currentUser$: BehaviorSubject<UserModel | undefined> = new BehaviorSubject<UserModel | undefined>(undefined);
	
	constructor(private afs: AngularFirestore,
	            private afa: AngularFireAuth,
	            private userService: UserService) { }
	
	/**
	 * Login user and get the currentUser in the cache
	 * @param {string} email
	 * @param {string} password
	 * @returns {Promise<any>}
	 */
	loginWithEmail = async (email: string, password: string) => {
		try {
			const auth: UserCredential = await this.afa.signInWithEmailAndPassword(email, password);
			if (!auth?.user) {
				return;
			}
			
			this.userAuth$.next(auth.user);
			
			return this.checkAndFetchCurrentUser(auth.user.uid);
		} catch (e: any) {
			console.error(e.message);
			return e;
		}
	};
	
	/**
	 * Signup a new user and set the new user in cache
	 * @param {UserModel} user
	 * @param {string} password
	 * @returns {Promise<any>}
	 */
	signUpWithEmail = async (user: UserModel, password: string) => {
		try {
			const auth: UserCredential = await this.afa.createUserWithEmailAndPassword(user.email, password);
			if (!auth.user) {
				return;
			}
			
			this.userAuth$.next(auth.user);
			
			const newUserObject: UserModel = {...user, uid: auth.user.uid} as UserModel;
			await this.userService.createUser(newUserObject);
			this.currentUser$.next(newUserObject);
			return user;
		} catch (e: any) {
			console.error(e.message);
			return e;
		}
	};
	
	loginWithGoogle = async () => {
		try {
			
			const googleProvider = new GoogleAuthProvider();
			const auth: UserCredential = await this.afa.signInWithPopup(googleProvider);
			if (!auth?.user) {
				return;
			}
			
			this.userAuth$.next(auth.user);
			
			return this.checkAndFetchCurrentUser(auth.user.uid);
		} catch (e: any) {
			console.error(e.message);
			return e;
		}
	};
	
	/**
	 * Check if user already exists in the cache if not, fetch the user from database and set it to current user cache
	 * @param {string} userId
	 * @returns {Promise<UserModel | undefined>}
	 */
	checkAndFetchCurrentUser = async (userId: string) => {
		// If userId does not exist, return
		if (!userId)
			return;
		
		// Check for cache
		let currentUser = this.currentUser$.getValue();
		if (currentUser) {
			return currentUser;
		}
		
		// Fetch user from database, check for existence, and return
		const response = await this.userService.getUser(userId);
		if (!response.exists)
			return;
		
		currentUser = response.data();
		this.currentUser$.next(currentUser);
		return currentUser;
	};
	
}
