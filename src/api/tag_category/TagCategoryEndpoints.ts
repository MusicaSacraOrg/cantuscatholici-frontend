import { Endpoints } from '../Endpoints';

export class TagCategoryEndpoints extends Endpoints {
    static getTags() {
        return `${this.baseUrl}/tag_category`;
    }

    static getTag(id: string) {
        return `${this.baseUrl}/tag_category/${id}`;
    }

    static createTag() {
        return `${this.baseUrl}/tag_category/create`;
    }

    static updateTag(id: string) {
        return `${this.baseUrl}/tag_category/update/${id}`;
    }

    static deleteTag(id: string) {
        return `${this.baseUrl}/tag_category/delete/${id}`;
    }
}
