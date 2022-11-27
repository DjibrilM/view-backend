import express from "express"
const Routes = express.Router();
import { login } from "../controllers/auth.js"

Routes.post("/login", login);

export default Routes;