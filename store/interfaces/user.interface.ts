import { ICard } from "./card.interface";

export interface IUser {
	id: number;
	name: string;
	username: string;
	email: string;
	isActive: boolean;
	cards: ICard[];
	createdAt: Date;
	updatedAt: Date;
}

export interface IUserState {
	authenticated: boolean;
	currentUser: IUser;
	userLoader: boolean;
}
