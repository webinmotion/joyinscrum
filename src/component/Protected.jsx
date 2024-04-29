import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../store";

export default function Protected() {

    const { auth } = useAppContext();
    const { location } = useLocation();

    return auth.session ? (
        <Outlet />
    ) : (
        <Navigate to="/signin" state={{ from: location }} replace />
    );
}
