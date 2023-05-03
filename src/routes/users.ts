import { getUsers, createUser } from "../controllers/user";
const router = require('express').Router();

router.get("/users", getUsers);
router.post("/users", createUser);


export default router;
