import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGlobalState } from "../../context/GlobalState";
import jwtDecode from "jwt-decode";
import axios from "axios";

const GoogleCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [state, dispatch] = useGlobalState();

    useEffect(() => {
        const code = searchParams.get('code');

        if (code) {
            axios.post(`${import.meta.env.VITE_API_URL}/api/auth/google/`, {
                code: code,
                redirect_uri: `${window.location.origin}/auth/google/callback`
            })
                .then((res) => {
                    if (res.data && res.data.access) {
                        let data = jwtDecode(res.data.access);
                        dispatch({
                            currentUserToken: res.data.access,
                            currentUser: data,
                        });
                        navigate("/main");
                    }
                })
                .catch((error) => {
                    console.error("Google login error:", error);
                    navigate("/login");
                });
        } else {
            navigate("/login");
        }
    }, [searchParams, navigate, dispatch];

    return (
        <div className="container text-center mt-5">
            <h3>Completing Google Sign-In...</h3>
        </div>
    );
};

export default GoogleCallback;
