import { ObjectId } from "mongodb";

export interface Card {
  name: string;
  link: string;
  owner: ObjectId;
  likes: Array<ObjectId> | [];
  createdAt: Date;
}
