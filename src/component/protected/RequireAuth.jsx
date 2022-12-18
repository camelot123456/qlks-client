import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {ACCESS_TOKEN} from "constants/constants";
import {getAccountMe} from "redux/slice/auth-slice";

const RequireAuth = ({allowedRoles}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) {
            dispatch(getAccountMe())
                .then(accountRes => {
                    const authorities = accountRes?.payload?.authorities;
                    const check = authorities.some(role => allowedRoles.includes(role));
                    if (!check) navigate('/unauthorized', {replace: true, state: {from: location}});
                });
        } else {
            navigate('/login', {replace: true, state: {from: location}});
        }
    }, []);

    return (
        <Outlet/>
    );
};

export default RequireAuth;
