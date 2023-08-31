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
    loginig;
    passig;
    idsubscribe;
    timestartsubscribe;
    isactivated;
    activationlink;
    domainvk;
    domaintg;
    company_id;


    constructor() {
        makeAutoObservable(this);
    }

    setCompanyId(companyId) {
        this.company_id = companyId
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

    setLoginIg(loginig) {
        this.loginig = loginig;
    }

    setPassIg(passig) {
        this.passig = passig;
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

    setDomainVk(domainvk) {
        this.domainvk = domainvk;
    }

    setDomainTg(domaintg) {
        this.domaintg = domaintg;
    }

    async getUserById(id) {
        try {
            const response = await UserServices.getUserById(id);
            this.setId(response.data.id);
            this.setName(response.data.name);
            this.setLastName(response.data.lastname);
            this.setEmail(response.data.email);
            this.setAvatar(response.data.avatar);
            this.setTokenTg(response.data.tokentg);
            this.setTokenVk(response.data.tokenvk);
            this.setLoginIg(response.data.loginig);
            this.setPassIg(response.data.passig);
            this.setIdSubscribe(response.data.idsubscribe);
            this.setTimeStartSubscribe(response.data.timesrtartsubscribe);
            this.setIsActivated(response.data.isactivated);
            this.setDomainVk(response.data.domainvk);
            this.setDomainTg(response.data.domaintg);
            this.setCompanyId(response.data.company_id);
        } catch (e) {
            console.log(e)
        }
    }

    async updateUser(user, avatar) {
        try {
            const {id, ...field} = user;
            const response = await UserServices.updateUser(id, field, avatar);
            // console.log(`UPDATE ${response}`)
            this.setId(response.data.id);
            this.setName(response.data.name);
            this.setLastName(response.data.lastname);
            this.setEmail(response.data.email);
            this.setAvatar(response.data.avatar);
            this.setTokenTg(response.data.tokentg);
            this.setTokenVk(response.data.tokenvk);
            this.setLoginIg(response.data.loginig);
            this.setPassIg(response.data.passig);
            this.setIdSubscribe(response.data.idsubscribe);
            this.setTimeStartSubscribe(response.data.timesrtartsubscribe);
            this.setIsActivated(response.data.isactivated);
            this.setDomainVk(response.data.domainvk);
            this.setDomainTg(response.data.domaintg);
            this.setCompanyId(response.data.company_id)
        } catch (e) {
            console.log(e);
            return e.response?.data;
        }
    }
}