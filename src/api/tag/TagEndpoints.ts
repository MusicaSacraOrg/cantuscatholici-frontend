import { Endpoints } from '../Endpoints';

export class TagEndpoints extends Endpoints {
    static getTags() {
        return `${this.baseUrl}/api/tag/`;
    }

    static getTag(id: string | number) {
        return `${this.baseUrl}/api/tag/${id}`;
    }

    static createTag() {
        return `${this.baseUrl}/api/tag/`;
    }

    static updateTag(id: string | number) {
        return `${this.baseUrl}/api/tag/${id}`;
    }

    static deleteTag(id: string | number) {
        return `${this.baseUrl}/api/tag/${id}`;
    }
}
