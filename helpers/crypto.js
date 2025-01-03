import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid';
import { OTP_LENGTH } from '../Constants.js';

const sha256Hash = (string) => {
    return crypto.createHash('sha256').update(string).digest('hex');
}

const generateSessionId = (email) => {
    return sha256Hash(`${uuidv4()}${Date.now()}${email}`);
}

const generateOTP = () => {
    let otp = "";
    for (let i=0; i<OTP_LENGTH; i++) {
        otp = `${otp}${Math.floor(Math.random() * 9)}`;
    }

    return otp;
}

export { generateSessionId, sha256Hash, generateOTP };