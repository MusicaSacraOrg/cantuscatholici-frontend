import { Endpoints } from '../Endpoints';

export class RoleEndpoints extends Endpoints {
    static getRoles() {
        return `${this.baseUrl}/api/user_role/`;
    }

    static getRole(id: string | number) {
        return `${this.baseUrl}/api/user_role/${id}`;
    }
}
