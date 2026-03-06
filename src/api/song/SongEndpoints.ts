import { Endpoints } from '../Endpoints';

export class SongEndpoints extends Endpoints {
    static getSongs() {
        return `${this.baseUrl}/api/song/`;
    }

    static getSong(id: string | number) {
        return `${this.baseUrl}/api/song/${id}`;
    }

    static createSong() {
        return `${this.baseUrl}/api/song/`;
    }

    static updateSong(id: string | number) {
        return `${this.baseUrl}/api/song/${id}`;
    }

    static deleteSong(id: string | number) {
        return `${this.baseUrl}/api/song/${id}`;
    }

    static getSongLyrics(id: string | number) {
        return `${this.baseUrl}/api/song/${id}/lyrics`;
    }

    static updateSongLyrics(id: string | number) {
        return `${this.baseUrl}/api/song/${id}/lyrics`;
    }
}
