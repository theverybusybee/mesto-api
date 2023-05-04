import { Request, Response } from "express";
import Card from "../models/card";

export const getCards = (req: Request, res: Response) => {
  return Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `${err.message}` }));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;

  const ownerId = req.user._id;

  return Card.create({ name, link, owner: ownerId })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: `${err.message}` });
      } else {
        res.status(500).send({ message: `${err.message}` });
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
        res.status(404).send({ message: `Нет карточки с id: ${cardId}` });
      }
    })
    .catch((err) => res.status(500).send({ message: `${err.message}` }));
};

export const setLike = (req: Request, res: Response) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Нет карточки с id: ${cardId}` });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => res.status(500).send({ message: `${err.message}` }));
};

export const removeLike = (req: Request, res: Response) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Нет карточки с id: ${cardId}` });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => res.status(500).send({ message: `${err.message}` }));
};
