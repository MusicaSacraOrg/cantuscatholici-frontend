import { Endpoints } from '../Endpoints';

export class UserEndpoints extends Endpoints {
    static getCurrentUser() {
        //return `${this.baseUrl}/user/`;
        return '/mocks/user.json';
    }

    static getUser(id: string) {
        //return `${this.baseUrl}/user/${id}`;
        return '/mocks/users.json';
    }
}
