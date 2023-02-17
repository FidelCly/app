import { IBalance } from "./balance.interface";
import { IShop } from "./shop.interface";

export interface ICard {
	id: number;
	url: string;
	shopId: number;
	shop: IShop;
	userId: number;
	startAt?: Date;
	endAt?: Date;
	isActive?: boolean;
	createAt?: Date;
	updatedAt?: Date;
	balances: IBalance[];
}

export interface ICardState {
	cards: ICard[]; // Array of cards maybe not needed
	currentCard: ICard;
	cardLoader: boolean;
}
