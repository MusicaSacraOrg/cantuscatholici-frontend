import { Endpoints } from '../Endpoints';

export class AuthEndpoints extends Endpoints {
    static login() {
        return `${this.baseUrl}/user/login`;
    }

    static register() {
        return `${this.baseUrl}/user/register`;
    }

    static getCurrentUser() {
        return `${this.baseUrl}/user/`;
    }
}
