import { makeAutoObservable } from 'mobx';
export default class CompStore {
    ig = false;
    tg = false;
    vk = false;
    isLoading = true;

    constructor() {
        makeAutoObservable(this);

        this.setIg = this.setIg.bind(this);
        this.setTg = this.setTg.bind(this);
        this.setVk = this.setVk.bind(this);
        this.setIsLoading = this.setIsLoading.bind(this);
    }

    setIg(ig) {
        this.ig = ig;
    }

    setTg(tg) {
        this.tg = tg;
    }

    setVk(vk) {
        this.vk = vk;
    }

    setIsLoading(isLoading) {
        this.isLoading = isLoading;
    }
}