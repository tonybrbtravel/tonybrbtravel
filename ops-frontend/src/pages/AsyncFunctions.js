import { Auth } from "aws-amplify";

export const ForgotPasswordVerifyCode = async (email) => {
    try {
        return await Auth.forgotPassword(email);
    }
    catch (error) {
        console.log('error signing out: ', error);
    }
}

export const UpdateConfirmPassword = async (email,code,password) => {
    try {
        return await Auth.forgotPasswordSubmit(
            email,
            code,
            password
        )
    }
    catch (error) {
       // console.log('error signing out: ', error);
        return error;
    }
}
