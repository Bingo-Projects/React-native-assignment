// Import Library
import { Schema as _Schema } from "mongoose";

// Import Database
import { verify } from "../../db_config.js";


// Create schema
const Schema = new _Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    account_type: { type: String, required: true },
    otp: { type: String, default: "", required: true },
    chances_used: { type: Number, default: 0 },
    created: { type: Date, default: new Date() }
});

// will be use on login
Schema.index({ email: 1 }, { unique: true });

// Compile Schema into Model
export default verify.model("register", Schema);