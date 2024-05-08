import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../../store";

export default function GuestOnly() {

    const { auth } = useAppContext();
    const { location } = useLocation();

    return !auth?.session ? (
        <Outlet />
    ) : (
        <Navigate to="/conflict" state={{ from: location }} replace />
    );
}
