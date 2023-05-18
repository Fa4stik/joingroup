import $api from "../http";

export default class UserServices {
    static async getUserById(id) {
        return $api.get(`/user/${id}`);
    }

    static async updateUser(id, field, avatar) {
        const formData = new FormData();

        formData.append('id', id);
        for (const key in field) {
            formData.append(key, field[key]);
        }

        if (avatar) {
            formData.append('avatar', avatar);
        }

        return $api.put(`/user`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}
