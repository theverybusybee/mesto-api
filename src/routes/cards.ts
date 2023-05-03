import { createCard, deleteCard, getCards } from "../controllers/card";
import Router from "express";

const router = Router();

router.get("/cards", getCards);
router.post("/cards", createCard);
router.delete("/cards/:cardId", deleteCard);

export default router;
