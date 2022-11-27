import express from "express";
const Routes = express.Router();
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";
import Route from "./post.js";


Routes.get("/:id", verifyToken, getUser);
Routes.get("/:id/friendId", verifyToken, getUserFriends);



//UPDATE 
Routes.patch("/:id/:friendId", verifyToken, addRemoveFriend);
Routes











export default Routes;