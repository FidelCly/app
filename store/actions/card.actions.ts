export enum CardActionTypes {
  // Get card
  GetCards = "card/GetCards",
  GetCardsSuccess = "card/GetCardsSuccess",
  GetCardsFailure = "card/GetCardsFailure",

  // Set card
  SetCard = "card/SetCard",
  SetCardSuccess = "card/SetCardSuccess",
  SetCardFailure = "card/SetCardFailure",

  // Update card
  UpdateCard = "card/UpdateCard",
  UpdateCardSuccess = "card/UpdateCardSuccess",
  UpdateCardFailure = "card/UpdateCardFailure",

  // Delete card => when use decide to delete his card
  DeleteCard = "card/DeleteCard",
  DeleteCardSuccess = "card/DeleteCardSuccess",
  DeleteCardFailure = "card/DeleteCardFailure",
}
