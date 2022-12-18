import {ClaimApprovalStatus, ClaimPaymentStatus} from '../enums/claims.enum';

export interface ClaimInterface{
	id: string;
	title: string;
	shortDescription: string;
	description: string;
	company: string;
	account: string;
	totalAmount: number;
	items: ClaimItem[];
	dateSubmitted: Date;
	approvalStatus: ClaimApprovalStatus;
	paymentStatus: ClaimPaymentStatus,
	dateApproved?: Date;
	datePaid?: Date;
}


export interface ClaimItem {
	id: string;
	name: string;
	description: string;
	amount: number;
	metaData?: any;
	
}
