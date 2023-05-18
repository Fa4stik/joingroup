import $api from "../http";

export default class SubscribeService {
    static async getSubscribeById(id) {
        return $api.get(`/subscribe/${id}`);
    }
}