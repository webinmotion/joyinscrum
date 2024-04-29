import { SIGN_OUT_ACTION, SET_SESSION_ACTION } from "./authActions";

export const initialAuth = {
    error: '',
    session: null
};

export const authReducer = (auth, action) => {
    switch (action.type) {
        case SET_SESSION_ACTION: {
            return ({ ...auth, session: action.auth?.session })
        }
        case SIGN_OUT_ACTION: {
            return ({ ...auth, ...initialAuth })
        }
        default: {
            return auth;
        }
    }
}
