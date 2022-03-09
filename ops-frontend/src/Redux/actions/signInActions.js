import * as type from '../types';
export function  getSignInDetails (signinresponse) {
    return{
        type: type.GET_SINGIN_REQUESTED,
        payload: signinresponse
    }
}
// export function signOutUser() {
//     return {
//         type: type.SIGN_OUT_REQUESTED
//     }
// }
export function signOutUser() {
    return {
        type: type.GET_SINGIN_FAILED,

    }
}