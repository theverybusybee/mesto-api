import { NextFunction, Request, Response } from "express";
import User from "../models/user";

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: `${err.message}` });
      } else {
        res.status(500).send({ message: `${err.message}` });
      }
    });
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `${err.message}` }));
};

export const getUserById = (req: Request, res: Response) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Нет пользователя с id: ${userId}` });
        return;
      }
      res.send({ data: user });
    })

    .catch((err) => {
      res.status(500).send({ message: `${err.message}` });
    });
};

export const updateProfile = (req: Request, res: Response) => {
  const { name, about } = req.body;

  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about })
    .then((user) => res.send({ data: user }))
     .catch((err) => res.status(err.status || 400).send({ message: `${err.message || err}` }));
};

export const updateAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;

  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(err.status || 400).send({ message: `${err.message || err}` })
    );
};
