export const SET_PLAYERS_ACTION = "SET_PLAYERS_ACTION"
export const SET_SCRUM_ACTION = "SET_SCRUM_ACTION";
export const ADD_PLAYER_ACTION = "ADD_PLAYER_ACTION";
export const UPDATE_PLAYER_ACTION = "UPDATE_PLAYER_ACTION";
export const REMOVE_PLAYER_ACTION = "REMOVE_PLAYER_ACTION";
export const CLEAR_ALL_VOTES_ACTION = "CLEAR_ALL_VOTES_ACTION";

export const setPlayersAction = dispatch => (players) => {
    dispatch({
        type: SET_PLAYERS_ACTION, players,
    });
}

export const setScrumAction = dispatch => (scrum) => {
    dispatch({
        type: SET_SCRUM_ACTION, scrum,
    });
};

export const addPlayerAction = dispatch => (player) => {
    dispatch({
        type: ADD_PLAYER_ACTION, player,
    })
}

export const updatePlayerAction = dispatch => (player) => {
    dispatch({
        type: UPDATE_PLAYER_ACTION, player,
    })
}

export const removePlayerAction = dispatch => (player) => {
    dispatch({
        type: REMOVE_PLAYER_ACTION, player,
    })
}

export const clearAllVotesAction = dispatch => () => {
    dispatch({
        type: CLEAR_ALL_VOTES_ACTION
    })
}


