import { Endpoints } from '../Endpoints';

export class AuthEndpoints extends Endpoints {
    static login() {
        return `${this.baseUrl}/api/user/login`;
    }

    static register() {
        return `${this.baseUrl}/api/user/register`;
    }

    static getCurrentUser() {
        return `${this.baseUrl}/api/user/`;
    }
}
