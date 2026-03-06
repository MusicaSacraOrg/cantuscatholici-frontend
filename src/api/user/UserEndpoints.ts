import { Endpoints } from '../Endpoints';

export class UserEndpoints extends Endpoints {
    static getUser(id: string) {
        return `${this.baseUrl}/api/user/${id}`;
    }
}
