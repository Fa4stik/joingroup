import {useEffect, useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../context";

export function useAuthRedirect() {
    const { authStore, userStore } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (localStorage.getItem('token')) {
                await authStore.checkAuth();
                if (authStore.user) {
                    await userStore.getUserById(authStore.user.id);
                }
                console.log(`HOOKS auth: ${authStore?.user?.id}`);
                console.log(`HOOKS user: ${userStore?.name}`);
            }
            if (!authStore.isAuth) {
                navigate('/registration')
            }
        })();
    }, []);
}