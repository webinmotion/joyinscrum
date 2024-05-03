import Container from '@mui/material/Container';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { supabase } from './service/auth';
import AlertMessage from './component/AlertMessage';
import { useAppContext } from './store';
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import Dashboard from './component/Dashboard';
import Protected from './component/Protected';
import LiveScrum from './component/LiveScrum';
import Organizer from './component/Organizer';
import JoinScrum from './component/JoinScrum';
import GuestOnly from './component/GuestOnly';
import Status404 from './component/Status404';
import Status409 from './component/Status409';
import MyProfile from './component/MyProfile';
import MySettings from './component/MySettings';
import PasswordRecover from './component/PasswordRecover';
import PasswordReset from './component/PasswordReset';
import FromMagicLink from './component/FromMagicLink';

export default function App() {

  const { alert, clearAlert, setSession } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession("getSession", session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("onAuthStateChange", event)
      switch (event) {
        case "INITIAL_SESSION": {
          console.log("starting new session", session);
          break;
        }
        case "SIGNED_IN": {
          console.log("user is signed in", session);
          const from = location.state?.from?.pathname || "/";
          navigate(from, { replace: true });
          break;
        }
        default: {
          //do nothing
          break;
        }
      }
      setSession(session)
    })

    return () => {
      // call unsubscribe to remove the callback
      subscription.unsubscribe()
    }
  }, [])


  return (
    <Container component="main" sx={{ ml: 5 }}>
      <AlertMessage {...alert} clearAlert={clearAlert} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/recover" element={<PasswordRecover />} />
        <Route path="/reset" element={<PasswordReset />} />
        <Route element={<Protected />}>
          <Route path="/organize" element={<Organizer />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/settings" element={<MySettings />} />
        </Route>
        <Route element={<GuestOnly />}>
          <Route path="/joinscrum" element={<JoinScrum />} />
        </Route>
        <Route path="/scrum/:scrumId" element={<FromMagicLink />} />
        <Route path="/scrum/:scrumId/player/:playerId" element={<LiveScrum />} />
        <Route path="/conflict" element={<Status409 />} />
        <Route path="*" element={<Status404 />} />
      </Routes>
    </Container>
  );
}