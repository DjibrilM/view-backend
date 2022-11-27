import Post from "../models/post.js";
import User from "../models/user.js";
User


export const createPost = async (req, res, next) => {
    try {
        const { userId, description } = req.body;
        const picturePath = req.file.path;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "fail to create post." });
        const newPost = new Post.create({
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user._id,
            location: user.location,
            userPicturePath: user.picturePath,
            picturePath: picturePath,
            description: description,
            likes: {},
            comment: [],
        })

        //save post
        const savePost = await newPost();
        return res.status(202).json(savePost);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

//fetch posts
export const geetFeedPost = async (req, res, next) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        return res.status(501).json({ message: error.message });
    }
}

//get user posts
export const getUserPosts = async (req, res, next) => {
    try {
        const userId = req.aramas;
        const userPosts = Post.find({ userId: userId });
        return res.status(200).json(userPosts);
    } catch (error) {

    }
}

//like post 
export const likePosts = async () => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLIked = post.likes.get(userId);
        if (isLIked) {
            post.likes.delete();
        } else {
            post.likes.set(userId, true);
        }

        // const updatedPost = Post.findOneAndUpdate(id,
        //     { likes: post.likes },
        //     {new:true}        
        // )

       
        const updatePost = await post.save();
        return res.status(201).json(updatePost)
    } catch (error) {
        console.log()
    }
}

