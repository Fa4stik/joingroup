import {useEffect, useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../context";

export function useAuthRedirect() {
    const { authStore, userStore } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            authStore.setLoading(true);
            if (localStorage.getItem('token')) {
                await authStore.checkAuth();
                if (authStore.user) {
                    await userStore.getUserById(authStore.user.id);
                }
            }
            if (!authStore.isAuth) {
                navigate('/registration')
            }
            authStore.setLoading(false);
        })();
    }, [authStore, navigate, userStore]);
};