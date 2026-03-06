import { Endpoints } from '../Endpoints';

export class SongEndpoints extends Endpoints {
    static getSongs() {
        return `${this.baseUrl}/api/song/`;
    }

    static getSong(id: string | number) {
        return `${this.baseUrl}/api/song/${id}`;
    }
}
