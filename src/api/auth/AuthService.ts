import { AbstractService } from '../AbstractService';
import { AuthEndpoints } from './AuthEndpoints';
import axios from 'axios';

export class AuthService extends AbstractService {
    static async login(credentials: any) {
        return await axios.post(
            AuthEndpoints.login(),
            credentials,
            this.getHeaders()
        );
    }

    static async register(user: any) {
        return await axios.post(
            AuthEndpoints.register(),
            user,
            this.getHeaders()
        );
    }

    static async getCurrentUser() {
        return await axios.get(
            AuthEndpoints.getCurrentUser(),
            this.getHeaders()
        );
    }
}
