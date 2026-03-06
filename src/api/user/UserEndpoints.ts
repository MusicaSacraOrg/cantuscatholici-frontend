import { Endpoints } from '../Endpoints';

export class UserEndpoints extends Endpoints {
    static getUser(id: string) {
        return `${this.baseUrl}/api/user/${id}`;
    }

    static updateProfile() {
        return `${this.baseUrl}/api/user/profile`;
    }

    static changePassword() {
        return `${this.baseUrl}/api/user/password`;
    }
}
