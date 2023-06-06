import {makeAutoObservable} from "mobx";
import SubscribeService from "../services/SubscribeService";


export default class SubscribeStore {
    id;
    name;
    timeofactionday;
    constructor() {
        makeAutoObservable(this);
    }

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setTimeOfActionDay(sec) {
        this.timeofactionday = sec;
    }

    async getSubscribeById(id) {
        try {
            const response = await SubscribeService.getSubscribeById(id);
            // console.log(response);
            this.setId(response.data.id);
            this.setName(response.data.name);
            this.setTimeOfActionDay(response.data.timeofactionday);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
}