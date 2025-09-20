import { AbstractService } from '../AbstractService';
import axios from 'axios';
import { TagEndpoints } from './TagEndpoints';

export class TagService extends AbstractService {
    static async getTags() {
        return await axios.get(TagEndpoints.getTags());
    }

    static async getTag(id: string) {
        return await axios.get(TagEndpoints.getTag(id), this.getHeaders());
    }

    static async createTag() {}

    static async updateTag() {}

    static async deleteTag(id: string) {
        return await axios.delete(
            TagEndpoints.deleteTag(id),
            this.getHeaders()
        );
    }
}
