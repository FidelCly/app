import { ShopActivity } from "../enums/shop-activity.enum";
import { ICard } from "./card.interface";
import { IPromotion } from "./promotion.interface";

export interface IShop {
	id: number;
	activity: ShopActivity;
	companyName: string;
	siren: string;
	siret: string;
	email: string;
	zipCode: string;
	geoloc: string;
	phone: string;
	address: string;
	createdAt: string;
	updatedAt: string;
	cards: ICard[];
	promotions: IPromotion[];
}

export interface IShopState {
	shops: IShop[];
	currentShop: IShop;
	shopLoader: boolean;
	shopError: string;
}
