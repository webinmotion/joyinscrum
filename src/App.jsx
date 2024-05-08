import Container from '@mui/material/Container';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { supabase } from './service/auth';
import AlertMessage from './component/util/AlertMessage';
import { useAppContext } from './store';
import SignUp from './component/auth/SignUp';
import SignIn from './component/auth/SignIn';
import Dashboard from './component/routes/Dashboard';
import Protected from './component/routes/Protected';
import LiveScrum from './component/guest/LiveScrum';
import Organizer from './component/organizer/Organizer';
import JoinScrum from './component/guest/JoinScrum';
import GuestOnly from './component/routes/GuestOnly';
import Status404 from './component/routes/Status404';
import Status409 from './component/routes/Status409';
import MyProfile from './component/organizer/MyProfile';
import MySettings from './component/organizer/MySettings';
import PasswordRecover from './component/auth/PasswordRecover';
import PasswordReset from './component/auth/PasswordReset';

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
        <Route path="/scrum/:scrumId/player/:playerId" element={<LiveScrum />} />
        <Route path="/conflict" element={<Status409 />} />
        <Route path="*" element={<Status404 />} />
      </Routes>
    </Container>
  );
}