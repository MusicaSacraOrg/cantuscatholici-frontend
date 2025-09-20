import { Endpoints } from '../Endpoints';

export class TagEndpoints extends Endpoints {
    static getTags() {
        return `${this.baseUrl}/tags`;
    }

    static getTag(id: string) {
        return `${this.baseUrl}/tags/${id}`;
    }

    static createTag() {
        return `${this.baseUrl}/tags/create`;
    }

    static updateTag(id: string) {
        return `${this.baseUrl}/tags/update/${id}`;
    }

    static deleteTag(id: string) {
        return `${this.baseUrl}/tags/delete/${id}`;
    }
}
