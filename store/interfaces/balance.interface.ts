import { IPromotion } from "./promotion.interface";

export interface IBalance {
	id: number;
	cardId: number;
	counter?: number;
	createdAt?: string;
	isActive?: boolean;
	promotion: IPromotion;
	promotionId: number;
	updatedAt?: string;
}

export interface IBalanceState {
	currentCardBalance: IBalance;
	balanceLoader: boolean;
}
