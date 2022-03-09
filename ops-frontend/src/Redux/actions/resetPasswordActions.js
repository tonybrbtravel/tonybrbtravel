import * as type from '../types';
export function  getResetPasswordDetails (resetPasswordresponse) {
    return{
        type: type.RESET_PASSWORD_REQUESTED,
        payload: resetPasswordresponse
    }
}
//