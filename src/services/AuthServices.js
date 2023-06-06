import $api from "../http";

export default class AuthServices {
    static async login(email, password) {
        return $api.post('/login', {email, password})
    }

    static async registration(name, lastname, email, password) {
        return $api.post('/registration', {name, lastname, email, password})
    }

    static async logout() {
        return $api.post('/logout', )
    }

    static async resetPassword(email) {
        return $api.put('/resetPassword', {email})
    }
}