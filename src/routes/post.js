import express from "express";
const Route = express.Router();
import { verifyToken } from "../middleware/auth.js";
import {
    createPost,
    geetFeedPost,
    getUserPosts,
    likePosts
} from "../controllers/post.js";


//READ POST
Route.get("/", verifyToken, geetFeedPost);
Route.get('/:userId/posts', verifyToken, getUserPosts);
//

//UPDATE
Route.post('/', verifyToken, createPost);
Route.post("/:postId/like", verifyToken, likePosts);


export default Route;