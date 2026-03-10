import { Endpoints } from '../Endpoints';

export class TranspositionEndpoints extends Endpoints {
    static transpose(songId: string | number) {
        return `${this.baseUrl}/api/song/${songId}/transpose`;
    }

    static getTranspositions(songId: string | number) {
        return `${this.baseUrl}/api/song/${songId}/transpositions`;
    }
}
