import $api from "../http";

export default class TgServices {
    static async createPost(user, message, picture) {
        const formData = new FormData();

        for (const key in user) {
            formData.append(key, user[key]);
        }

        formData.append('message', message);

        if (picture) {
            formData.append('picture', picture)
        }

        return $api.post('/tg/createPost', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}