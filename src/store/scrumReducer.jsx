import { ADD_PLAYER_ACTION, SET_PLAYERS_ACTION, SET_SCRUM_ACTION, UPDATE_PLAYER_ACTION, REMOVE_PLAYER_ACTION, CLEAR_ALL_VOTES_ACTION, } from "./scrumActions";

export const initialScrum = null;

export const initialPlayers = [];

export const scrumReducer = (scrum, action) => {
    switch (action.type) {
        case SET_SCRUM_ACTION: {
            return action.scrum
        }
        default: {
            return scrum;
        }
    }
}

export const playersReducer = (players, action) => {
    switch (action.type) {
        case SET_PLAYERS_ACTION: {
            return action.players
        }
        case ADD_PLAYER_ACTION: {
            return [...players, action.player]
        }
        case UPDATE_PLAYER_ACTION: {
            const predicate = pl => pl.email === action.player.email;
            return players.map(pl => {
                if (predicate(pl)) {
                    return ({ ...pl, choice: action.player.choice })
                }
                return pl
            })
        }
        case REMOVE_PLAYER_ACTION: {
            return players.filter(pl => pl.email !== action.player.player_handle)
        }
        case CLEAR_ALL_VOTES_ACTION: {
            return players.map(pl => ({...pl, choice: ''}))
        }
        default: {
            return players;
        }
    }
}
