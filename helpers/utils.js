import { 
    PASSWORD_LENGTH_MAX,
    PASSWORD_LENGTH_MIN,
    SUPPORTED_EMAIL_PROVIDERS,
    EMAIL_LENGTH_MAX,
    OTP_LENGTH
} from "../Constants.js";


export const minPassed = (dateObj) => {
    const obj_created = (new Date(dateObj));
    let min_passed = (new Date().getTime() - obj_created.getTime()); // getting total milliseconds passed
    min_passed = parseFloat((min_passed / 60000).toFixed(1)); // converting milliseconds to minutes
    return min_passed
}


export const passCheck = (password) => {
    let error = {
        upperCase: false,
        lowerCase: false,
        number: false,
        special_char: false,
    }

    if (!password) {
        return "Password is required"
    }

    if (password.length < 7 || password.length > 16) {
        return `Length should be between ${PASSWORD_LENGTH_MIN} to ${PASSWORD_LENGTH_MAX}`;
    }

    password.split("").forEach((char) => {
        const code = char.charCodeAt(0);
        if (!error.number && (code > 47 && code < 58)) {
            error.number = true;
        }
        else if (!error.lowerCase && (code > 96 && code < 123)) {
            error.lowerCase = true;
        }
        else if (!error.upperCase && (code > 64 && code < 91)) {
            error.upperCase = true;
        }
        else if (!error.special_char &&
            (code == 35 || code == 36 || code == 37 || code == 38 || code == 42 || code == 43 || code == 63 || code == 64)
        ) {
            error.special_char = true;
        }
    });

    if (!error.lowerCase) {
        return "include a lowercase character";
    }
    if (!error.upperCase) {
        return "include a uppercase character";
    }
    if (!error.number) {
        return "include a number character";
    }
    if (!error.special_char) {
        return "include a special character : # $ % & * + ? @";
    }

    return "";
}


export const emailCheck = (email) => {
    if (email.length <= 0) {
        return "Email is required";
    }

    if (email.length > EMAIL_LENGTH_MAX) {
        return `Email should be smaller than ${EMAIL_LENGTH_MAX} characters`;
    }

    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
        return "Email is invalid";
    }

    const email_part = email.split("@")[1];
    let email_provider_valid = false;
    SUPPORTED_EMAIL_PROVIDERS.forEach((provider) => {
        if (email_part == provider) {
            email_provider_valid = true;
        }
    });

    if (!email_provider_valid) {
        return `Use: ${SUPPORTED_EMAIL_PROVIDERS.join(", ")} emails`;
    }

    return "";
}

export const otpValidate = (otp) => {
    if (!otp) {
        return "OTP is required";
    }

    if (otp.length !== OTP_LENGTH) {
        return "Invalid OTP"
    }

    let validOtp = true;

    otp.split("").forEach((char) => {
        const code = char.charCodeAt(0);
        if (code < 48 || code > 57) {
            validOtp = false;
            return
        }
    });

    if (!validOtp) {
        return "Invalid OTP";
    }

    return "";
};
