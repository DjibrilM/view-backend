import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


//REGISTER USER
export const register = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            location,
            occupation,
        } = req.body

        console.log(req.file.path)

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            picturePath: req.file.path,
            friends: [],
            location: location,
            occupation: occupation,
            password: passwordHash,
            ViewProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        })

        const saveUser = await newUser.save()
        return res.status(202).json(saveUser)
    } catch (error) {
        console.log(error)
        return res.status(501).json({ message: error.message })
    }
}



//LOGIN
export const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ message: "user not found" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(501).json({ message: "incorrect password" })

        const token = jwt.sign({ is: user._id }, process.env.SECRET);

        delete user.password;
        res.status(200).json({ user, token });

    } catch (error) {
        return res.status(501).json({ message: error.message })
    }
}
