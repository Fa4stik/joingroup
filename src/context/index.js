import {createContext} from "react";
import AuthStore from "../store/AuthStore";
import UserStore from "../store/UserStore";
import SubscribeStore from "../store/SubscribeStore";
import HeaderStore from "../store/HeaderStore";
import CompStore from "../store/ComponentsStore";

const headerStore = new HeaderStore();
export const MyHeaderContext = createContext({
    headerStore
});

const authStore = new AuthStore();
const userStore = new UserStore();
const subscribeStore = new SubscribeStore();
export const AuthContext = createContext({
    authStore,
    userStore,
    subscribeStore
});

const compStore = new CompStore();
export const CompContext = createContext({
    compStore
})