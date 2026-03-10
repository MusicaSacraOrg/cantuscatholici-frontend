import { Endpoints } from '../Endpoints';

export class ContentEndpoints extends Endpoints {
    static createMsczContent() {
        return `${this.baseUrl}/api/content/mscz`;
    }

    static getMsczContent(id: string | number) {
        return `${this.baseUrl}/api/content/mscz/${id}`;
    }
}
