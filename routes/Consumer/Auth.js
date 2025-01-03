// Libraries
import { Router as _Router } from "express";
import { generateOTP, sha256Hash } from "../../helpers/crypto.js";
import { emailCheck, minPassed, passCheck } from "../../helpers/utils.js";


import VERIFY_REGISTER_MODEL from "../../models/verify/Register.js";
import VERIFY_LOGIN_MODEL from "../../models/verify/Login.js";

import CONSUMER_ACCOUNT_MODEL from "../../models/accounts/Consumer.js";


const Router = _Router();


// register account
Router.post("/register", async (req, res) => {
    const { email, pass } = req.body;

    // field check
    const emailError = emailCheck(email);
    const passError = passCheck(pass);

    if (emailError) {
        return res.status(400).send({ success: false, msg: emailError });
    }
    if (passError) {
        return res.status(400).send({ success: false, msg: passError });
    }

    // Email already registered check
    const user = await CONSUMER_ACCOUNT_MODEL.findOne({ email });
    if (user) {
        return res.status(409).send({ success: false, msg: "Email already registered" });
    }

    try {
        const verify = await VERIFY_REGISTER_MODEL.findOne({ email });
        // checking if email verfication otp send already (it's a resend request)
        if (verify) {
            if (minPassed(verify.created) <= 1) {
                return res.status(400).send({ success: false, msg: "Wait for 60 seconds before resending otp" });
            }

            if (verify.chances_used < 3) {
                await VERIFY_REGISTER_MODEL.findOneAndUpdate({ email }, { password: sha256Hash(pass), created: new Date() });
            }
            else {
                let otp = generateOTP();
                console.log(email, otp);
                await VERIFY_REGISTER_MODEL.findOneAndUpdate({ email }, {
                    otp, password: sha256Hash(pass), chances_used: 0, created: new Date()
                });
            }
        }
        // if doing first time registertaion
        else {
            let otp = generateOTP();
            console.log(email, otp);
            await VERIFY_REGISTER_MODEL.create({ email, otp, account_type: "consumer", password: sha256Hash(pass) });
        }
        return res.status(200).send({ success: true, msg: "otp send to email" });
    } catch (error) {
        return res.status(500).send({ success: false, msg: "Internal Server Error" });
    }
});



// login account
Router.post("/login", async (req, res) => {
    const { email, pass } = req.body;

    // field check
    const emailError = emailCheck(email);
    const passError = passCheck(pass);

    if (emailError) {
        return res.status(400).send({ success: false, msg: emailError });
    }
    if (passError) {
        return res.status(400).send({ success: false, msg: passError });
    }

    // Email already registered check
    const user = await CONSUMER_ACCOUNT_MODEL.findOne({ email });
    if (!user || sha256Hash(pass) !== user.password) {
        return res.status(409).send({ success: false, msg: "Email or password is incorrect" });
    }

    try {
        const verify = await VERIFY_LOGIN_MODEL.findOne({ email });
        // checking if email verfication otp send already (it's a resend request)
        if (verify) {
            if (minPassed(verify.created) <= 1) {
                return res.status(400).send({ success: false, msg: "Wait for 60 seconds before resending otp" });
            }

            if (verify.chances_used < 3) {
                await VERIFY_LOGIN_MODEL.findOneAndUpdate({ email }, { password: sha256Hash(pass), created: new Date() });
            }
            else {
                let otp = generateOTP();
                console.log(email, otp);
                await VERIFY_LOGIN_MODEL.findOneAndUpdate({ email }, {
                    otp, password: sha256Hash(pass), chances_used: 0, created: new Date()
                });
            }
        }
        // if doing first time login
        else {
            let otp = generateOTP();
            console.log(email, otp);
            await VERIFY_LOGIN_MODEL.create({ email, otp, account_type: "consumer" });
        }
        return res.status(200).send({ success: true, msg: "otp send to email" });
    } catch (error) {
        return res.status(500).send({ success: false, msg: "Server Error" });
    }
});


export default Router;
