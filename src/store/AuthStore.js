import { makeAutoObservable } from 'mobx';
import AuthServices from "../services/AuthServices";
import axios from 'axios';
import {API_URL} from "../http";

export default class AuthStore {
    user = {};
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    async login(email, password) {
        try {
            const response = await AuthServices.login(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message)
            return e.response?.data?.message;
        }
    }

    async registration(name, lastname, email, password) {
        try {
            const response = await AuthServices.registration(name, lastname, email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            return response;
        } catch (e) {
            console.log(e.response?.data?.message)
            return e.response?.data?.message;
        }
    }

    async logout() {
        try {
            const response = await AuthServices.logout();
            console.log(response)
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            return response.data;
        } catch (e) {
            console.log(e)
        } finally {
            this.setLoading(false);
        }
    }
}