import { Request, Response } from "express";
import Card from "../models/card";

export const getCards = (req: Request, res: Response) => {
  return Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;

  const ownerId = req.user._id;

  return Card.create({ name, link, owner: ownerId })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: "Bad request" });
        console.error(err.stack);
      }
    });
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  return Card.findByIdAndDelete({ _id: cardId })
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res
          .status(400)
          .send({ message: `Карточки с id: ${cardId} не существует` });
        console.error();
      }
    })
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }))
    .catch((err) => console.log(err));
};
