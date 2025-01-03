// Libraries
import { Router as _Router } from "express";
const Router = _Router();

// Model
import VERIFY_LOGIN_MODEL from "../../models/verify/Login.js";
import CONSUMER_ACCOUNT_MODEL from "../../models/accounts/Consumer.js";
import CONSUMER_SESSION_MODEL from "../../models/session/Consumer.js";

import { emailCheck, otpValidate } from "../../helpers/utils.js";
import { generateSessionId } from "../../helpers/crypto.js";
import { minPassed } from "../../helpers/utils.js";


Router.post("/", async (req, res) => {
    const { email, otp } = req.body;

    const emailError = emailCheck(email);
    const otpError = otpValidate(otp);

    if (emailError || otpError) {
        return res.status(400).send({ success: false, msg: (emailError || otpError) });
    }


    try {
        const verify = await VERIFY_LOGIN_MODEL.findOne({ email });
        if (!verify) {
            return res.status(400).send({ success: false, msg: "No verfication code generated for this email" });
        }
        
        // Checking time (10 mins) and Chances used
        if ((minPassed(verify.created) > 10) || (verify.chances_used >= 3)) {
            return res.status(400).send({ success: false, msg: "OTP expired, please resend it" });
        }

        if (otp !== verify.otp) {
            await (VERIFY_LOGIN_MODEL.findByIdAndUpdate(verify._id, { chances_used: verify.chances_used + 1 }));
            return res.status(400).send({ success: false, msg: "Invalid otp" });
        }

        await (VERIFY_LOGIN_MODEL.findByIdAndDelete(verify._id));

        // create session
        const user = await CONSUMER_ACCOUNT_MODEL.findOne({ email });
        await CONSUMER_SESSION_MODEL.findOneAndDelete({ email });
        const session = await CONSUMER_SESSION_MODEL.create(
            { session_id: generateSessionId(email), email, user_id: user._id }
        );        

        return res.status(200).send({
            success: true,
            data: {
                session_id: session.session_id,
                email
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, msg: "Internal server error" });
    }
})

export default Router;