export const SIGN_OUT_ACTION = "SIGN_OUT_ACTION"
export const SET_SESSION_ACTION = "SET_SESSION_ACTION";

export const setSessionAction = dispatch => (session) => {
    dispatch({
        type: SET_SESSION_ACTION, auth: {
            session,
        }
    });
}

export const signOutAction = dispatch => () => {
    dispatch({
        type: SIGN_OUT_ACTION, auth: {
            session: null,
        }
    });
};


