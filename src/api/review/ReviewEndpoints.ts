import { Endpoints } from '../Endpoints';

export class ReviewEndpoints extends Endpoints {
    static listReviews() {
        return `${this.baseUrl}/api/review/`;
    }

    static getReview(id: string | number) {
        return `${this.baseUrl}/api/review/${id}`;
    }

    static approveReview(id: string | number) {
        return `${this.baseUrl}/api/review/${id}/approve`;
    }

    static rejectReview(id: string | number) {
        return `${this.baseUrl}/api/review/${id}/reject`;
    }

    static addComment(id: string | number) {
        return `${this.baseUrl}/api/review/${id}/comment`;
    }
}
