import JWT from "jsonwebtoken";
import env from "dotenv";
env.config();

export const verifyToken = (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) return res.status(403).json({ message: "access denied !" });
        if (token.startsWith("Bearer")) {
            token = token.slice(7, token.length).trimLeft();
            const verified = JWT.verify(token, process.env.SECRET);
            if (!verified) return res.status(403).json({ message: "access denied !" });
            req.user = verified;
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(501).json({ message: error.message });
    }
}