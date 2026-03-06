import { Endpoints } from '../Endpoints';

export class TagCategoryEndpoints extends Endpoints {
    static getTagCategories() {
        return `${this.baseUrl}/api/tag_category/`;
    }

    static getTagCategoriesWithTags() {
        return `${this.baseUrl}/api/tag_category/with-tags`;
    }

    static getTagCategory(id: string | number) {
        return `${this.baseUrl}/api/tag_category/${id}`;
    }

    static createTagCategory() {
        return `${this.baseUrl}/api/tag_category/`;
    }

    static updateTagCategory(id: string | number) {
        return `${this.baseUrl}/api/tag_category/${id}`;
    }

    static deleteTagCategory(id: string | number) {
        return `${this.baseUrl}/api/tag_category/${id}`;
    }
}
