import {createContext} from "react";
import AuthStore from "../store/AuthStore";
import UserStore from "../store/UserStore";
import SubscribeStore from "../store/SubscribeStore";

export const MyHeaderContext = createContext('');

const authStore = new AuthStore();
const userStore = new UserStore();
const subscribeStore = new SubscribeStore();
export const AuthContext = createContext({
    authStore,
    userStore,
    subscribeStore
});