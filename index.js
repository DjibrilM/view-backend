import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import env from "dotenv"
import helmet from "helmet";
import mongoose from "mongoose";
import { register } from "./src/controllers/auth.js"
import authroutes from "./src/routes/auth.js";
import userRoutes from "./src/routes/user.js";
import postRoutes from "./src/routes/post.js"

//CONFIGURATIONS// 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
env.config();
const app = express();
app.use(express.json());
app.use(helmet())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "300mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "300mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
//

//FILE STORAGE 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + new Date().toISOString());
    }
})
const upload = multer({ storage });
//

//ROUTES WITH FILS 
app.post("/auth/register", upload.single("file"), register)
app.use('/posts/', upload.single("picture"), postRoutes);
//

//ROUTES
app.use("/auth", authroutes);
app.use("/user", userRoutes);
//

//BAD REQUEST 
app.use("*", (req, res, nex) => {
    return res.status(404).json({ message: "request not found" })
})
//

//DATABASE CONNECTION 
const database_uri = process.env.MONGO_DB;
mongoose.connect(database_uri).then(result => {
    console.log('database connected');
    const SERVER_PORT = process.env.PORT
    app.listen(SERVER_PORT, () => console.log(`server port:${SERVER_PORT}`))
}).catch(err => {
    console.log(err, 'connection fails');
}).then()
//

//BAD REQUEST 


