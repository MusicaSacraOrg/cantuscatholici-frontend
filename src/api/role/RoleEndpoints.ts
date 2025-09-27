import { Endpoints } from '../Endpoints';

export class RoleEndpoints extends Endpoints {
    static getRoles() {
        return `${this.baseUrl}/roles`;
    }

    static getRole(id: string | number) {
        return `${this.baseUrl}/roles/${id}`;
    }
}
