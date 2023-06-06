import $api from "../http";
import {useContext} from "react";
import {CompContext} from "../context";

export default class MsgServices {
    static async getPosts(user) {
        return $api.post('/msg/getPosts', {...user})
    }

    static async getGroupInfo(user) {
        return $api.post('/msg/getGroupInfo', {...user})
    }

    static async setGroupInfo(user, groupInfo) {
        const formData = new FormData();

        for(const key in user) {
            formData.append(key, user[key])
        }

        for (const key in groupInfo) {
            if (user[key] === "") continue;
            formData.append(key, groupInfo[key]);
        }

        return $api.post('/msg/setGroupInfo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    static async getAnalysisPosts(user) {
        return $api.post('/msg/analysisPosts', {...user})
    }
}