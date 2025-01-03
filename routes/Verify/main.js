import { Router as _Router } from "express";
const Router = _Router();

import Register from "./Register.js";
import Login from "./Login.js";

// Routes
Router.use("/register", Register);
Router.use("/login", Login);

export default Router;