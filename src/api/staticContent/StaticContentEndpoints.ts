import { Endpoints } from '../Endpoints';

export class StaticContentEndpoints extends Endpoints {
    static upload() {
        return `${this.baseUrl}/api/static_content/upload`;
    }

    static getFile(id: string | number) {
        return `${this.baseUrl}/api/static_content/${id}`;
    }

    static deleteFile(id: string | number) {
        return `${this.baseUrl}/api/static_content/${id}`;
    }
}
