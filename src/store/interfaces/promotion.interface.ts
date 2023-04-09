export interface IPromotion {
  shopId: number;
  name: string;
  description?: string;
  checkoutLimit: number;
  startAt?: Date;
  endAt: Date;
  isActive?: boolean;
}

export interface IPromotionState {
  promotions: IPromotion[];
  currentPromotion: IPromotion;
  promotionLoader: boolean;
}
