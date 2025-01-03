// Import Library
import { Schema as _Schema } from "mongoose";

// Import Database
import { accounts } from "../../db_config.js";


// Create schema
const Schema = new _Schema({
    email: { type: String, required: true },
    googleSingup: { type: Boolean, default: false },
    password: { type: String, required: true },
    name: { type: Object, default: { first: "", last: "" }},
    avatar: { type: Object, default: { type: "default", uri: "" }},
    interests: [ { type: String } ],
    created: { type: Date, default: new Date() },
});

Schema.index({ email: 1 }, { unique: true });

// Compile Schema into Model
export default accounts.model("consumer", Schema);