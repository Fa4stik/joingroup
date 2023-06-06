import $api from "../http";
import {useContext} from "react";
import {AuthContext} from "../context";
export default class VkServices {
    static async getPosts(user) {
        return (await $api.post('vk/getPosts', {...user})).data;
    }

    static async getUserInfo(user, userVkId) {
        return (await $api.post('vk/getUserInfo', {...user, userVkId})).data;
    }

    static async createPost(user, message, picture) {
        const formData = new FormData();

        for (const key in user) {
            formData.append(key, user[key])
        }

        formData.append('message', message);

        if (picture) {
            formData.append('picture', picture);
        }

        return $api.post('/vk/createPost', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}