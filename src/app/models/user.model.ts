import {ClaimInterface} from '../interfaces/claim.interface';

export class UserModel {
	uid: string = '';
	email: string = '';
	username: string = '';
	profilePic: string = '';
	
	claims: ClaimInterface[] = [];
	
	constructor(private properties: Partial<UserModel> = {}) {
		Object.assign(this.properties);
	}
}
