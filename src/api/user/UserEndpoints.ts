import { Endpoints } from '../Endpoints';

export class UserEndpoints extends Endpoints {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getUser(id: string) {
        //return `${this.baseUrl}/user/${id}`;
        return '/mocks/user.json';
    }
}
