import { Endpoints } from '../Endpoints';

export class PersonEndpoints extends Endpoints {
    static getPersons() {
        return `${this.baseUrl}/api/person/`;
    }

    static getPerson(id: string | number) {
        return `${this.baseUrl}/api/person/${id}`;
    }

    static createPerson() {
        return `${this.baseUrl}/api/person/`;
    }
}
