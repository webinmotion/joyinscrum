import { createContext, useContext, useReducer } from "react";
import { alertReducer, initialAlert, } from './alertReducer';
import { authReducer, initialAuth, } from './authReducer';
import { scrumReducer, initialScrum, initialPlayers, playersReducer, } from './scrumReducer';
import { clearAlertAction, showAlertAction, } from "./alertActions";
import { signOutAction, setSessionAction, } from "./authActions";
import { addPlayerAction, setPlayersAction, setScrumAction, updatePlayerAction, removePlayerAction, clearAllVotesAction, } from "./scrumActions";
import PropTypes from 'prop-types';

const AppContext = createContext(null)

export function useAppContext() {
    return useContext(AppContext)
}

export function AppContextProvider({ children }) {

    const [auth, authDispatch] = useReducer(authReducer, initialAuth)

    const [alert, alertDispatch] = useReducer(alertReducer, initialAlert);

    const [scrum, scrumDispatch] = useReducer(scrumReducer, initialScrum);

    const [players, playersDispatch] = useReducer(playersReducer, initialPlayers);

    return <AppContext.Provider value={{
        auth,
        alert,
        scrum,
        players,

        // auth actions
        signOut: signOutAction(authDispatch),
        setSession: setSessionAction(authDispatch),

        //alert actions
        showAlert: showAlertAction(alertDispatch),
        clearAlert: clearAlertAction(alertDispatch),

        // scrum actions
        addPlayer: addPlayerAction(playersDispatch),
        setPlayers: setPlayersAction(playersDispatch),
        setScrum: setScrumAction(scrumDispatch),
        updatePlayer: updatePlayerAction(playersDispatch),
        removePlayer: removePlayerAction(playersDispatch),
        clearAllVotes: clearAllVotesAction(playersDispatch),
    }}>
        {children}
    </AppContext.Provider>

}

AppContextProvider.propTypes = {
    children: PropTypes.object.isRequired
}