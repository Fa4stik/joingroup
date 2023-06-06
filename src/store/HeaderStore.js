import {makeAutoObservable} from "mobx";

export default class HeaderStore {
    activeLink = "primary";

    constructor() {
        makeAutoObservable(this)
    }

    setActiveLink(activeLink) {
        this.activeLink = activeLink;
    }
}