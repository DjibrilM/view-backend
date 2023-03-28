import mongoose from "mongoose";

const user = new mongoose.Schema({
    firstName: {
        required: true,
        type: String,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        unique: true,
        max: 50,
        min: 5
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    picturePath: {
        type: String,
        default: ""
    },
    friends: {
        type: Array,
        default: [],
    },
    location: String,
    ViewProfile: Number,
    impressions: Number
}, {
    timestamps: true
})


const User = mongoose.model("user", user)
export default User;
