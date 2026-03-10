import { Endpoints } from '../Endpoints';

export class CalendarEndpoints extends Endpoints {
    static getEntries() {
        return `${this.baseUrl}/api/calendar/`;
    }

    static createEntry() {
        return `${this.baseUrl}/api/calendar/`;
    }

    static updateEntry(id: string | number) {
        return `${this.baseUrl}/api/calendar/${id}`;
    }

    static addSongToEntry(entryId: string | number, songId: string | number) {
        return `${this.baseUrl}/api/calendar/${entryId}/songs/${songId}`;
    }
}
