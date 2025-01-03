import express, { urlencoded, json } from "express";
import helmet from "helmet";

// Routes
import Consumer_Route from "./routes/Consumer/main.js";
import Verify_Route from "./routes/Verify/main.js";

const app = express();
// accepts req obj with any type -- HTML forms
app.use(urlencoded({ extended: true }));

// parse req obj as a json object
app.use(json());

// headers security improving
app.use(helmet());

// CORS policy
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Routes
app.use("/api/consumer", Consumer_Route);
app.use("/api/verify", Verify_Route);

const PORT = process.env.PORT || 4000;

try {
    app.listen(PORT, () => console.log("Started server on port " + PORT));
}
catch (err) {
    console.log(err);
}