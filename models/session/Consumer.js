// Import Library
import { Schema as _Schema } from "mongoose";

// Import Database
import { session } from "../../db_config.js";


// Create schema
const Schema = new _Schema({
    user_id: { type: String, required: true },
    session_id: { type: String, required: true },
    email: { type: String, required: true },
    created: { type: Date, default: new Date() },
});

Schema.index({ email: 1, session_id: 1, user_id: 1 }, { unique: true });

// Compile Schema into Model
export default session.model("consumer", Schema);