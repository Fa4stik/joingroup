import {makeAutoObservable} from "mobx";
import UserServices from "../services/UserServices";

export default class UserStore {
    id;
    name;
    lastname;
    email;
    avatar;
    tokentg;
    tokenvk;
    tokeninst;
    idsubscribe;
    timestartsubscribe;
    isactivated;
    activationlink;

    constructor() {
        makeAutoObservable(this);
    }

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setLastName(lastName) {
        this.lastname = lastName;
    }

    setEmail(email) {
        this.email = email;
    }

    setAvatar(path) {
        this.avatar = path;
    }

    setTokenTg(token) {
        this.tokentg = token;
    }

    setTokenVk(token) {
        this.tokenvk = token;
    }

    setTokenInst(token) {
        this.tokeninst = token;
    }

    setIdSubscribe(id) {
        this.idsubscribe = id;
    }

    setTimeStartSubscribe(date) {
        this.timestartsubscribe = date;
    }

    setIsActivated(bool) {
        this.isactivated = bool;
    }

    setActivationLink(link) {
        this.activationlink = link;
    }

    async getUserById(id) {
        try {
            const response = await UserServices.getUserById(id);
            console.log(response)
            this.setId(response.data.id);
            this.setName(response.data.name);
            this.setLastName(response.data.lastname);
            this.setEmail(response.data.email);
            this.setAvatar(response.data.avatar);
            this.setTokenTg(response.data.tokentg);
            this.setTokenVk(response.data.tokenvk);
            this.setTokenInst(response.data.tokeninst);
            this.setIdSubscribe(response.data.idsubscribe);
            this.setTimeStartSubscribe(response.data.timesrtartsubscribe);
            this.setIsActivated(response.data.isactivated);
        } catch (e) {
            console.log(e)
        }
    }

    async updateUser(user, avatar) {
        try {
            const {id, ...field} = user;
            const response = await UserServices.updateUser(id, field, avatar);
            console.log(`UPDATE ${response}`)
            this.setId(response.data.id);
            this.setName(response.data.name);
            this.setLastName(response.data.lastname);
            this.setEmail(response.data.email);
            this.setAvatar(response.data.avatar);
            this.setTokenTg(response.data.tokentg);
            this.setTokenVk(response.data.tokenvk);
            this.setTokenInst(response.data.tokeninst);
            this.setIdSubscribe(response.data.idsubscribe);
            this.setTimeStartSubscribe(response.data.timesrtartsubscribe);
            this.setIsActivated(response.data.isactivated);
        } catch (e) {
            console.log(e);
            return e.response?.data;
        }
    }
}