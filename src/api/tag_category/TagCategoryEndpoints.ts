import { Endpoints } from '../Endpoints';

export class TagCategoryEndpoints extends Endpoints {
    static getTagCategories() {
        //return `${this.baseUrl}/tag_category`;
        return '/mocks/tagCategories.json';
    }

    static getTagCategory(id: string) {
        return `${this.baseUrl}/tag_category/${id}`;
    }

    static createTagCategory() {
        return `${this.baseUrl}/tag_category/create`;
    }

    static updateTagCategory(id: string) {
        return `${this.baseUrl}/tag_category/update/${id}`;
    }

    static deleteTagCategory(id: string) {
        return `${this.baseUrl}/tag_category/delete/${id}`;
    }
}
