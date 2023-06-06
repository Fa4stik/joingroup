import $api from "../http";

export default class IgServices {
    static async createPost(user, message, picture) {
        const formData = new FormData()

        for (const key in user) {
            formData.append(key, user[key]);
        }

        formData.append('message', message);
        formData.append('picture', picture);

        console.log('post')

        return $api.post(`/ig/createPost`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}