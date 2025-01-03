import { Router as _Router } from "express";
const Router = _Router();

import Auth_Route from "./Auth.js";

// Routes
Router.use("/auth", Auth_Route);

export default Router;