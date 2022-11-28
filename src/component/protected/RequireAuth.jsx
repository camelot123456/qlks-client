import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants/constants";
import useAuth from "../../hooks/useAuth";
import { getAccountMe } from "../../redux/slice/auth-slice";

const RequireAuth = ({ allowedRoles }) => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) {
            dispatch(getAccountMe())
                .then(accountRes => {
                    const roles = accountRes?.payload?.authorities;
                    setAuth({roles});
                });
        }
    }, []);
    
    return (
        auth?.roles?.some(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;