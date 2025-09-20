export class AbstractService {
    static getUserToken() {
        return localStorage.getItem('token') || '';
    }

    static getHeaders() {
        return {
            headers: {
                Authorization: `Bearer ${this.getUserToken()}`,
            },
        };
    }

    static getHeadersWithFile = () => {
        return {
            headers: {
                Authorization: `Bearer ${this.getUserToken()}`,
                'Content-Type': 'multipart/form-data',
            },
        };
    };
}
