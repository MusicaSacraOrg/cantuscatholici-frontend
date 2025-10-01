import { AbstractService } from '../AbstractService';
import { AuthEndpoints } from './AuthEndpoints';
import axios from 'axios';
import { Credentials, NewUser, Token } from '../../models/auth';
import { User } from '../../models/user';

export class AuthService extends AbstractService {
    static async login(credentials: Credentials) {
        const { data: token } = await axios.post<Token>(
            AuthEndpoints.login(),
            credentials,
            this.getHeaders()
        );

        localStorage.setItem('token', token.accessToken);

        return await this.getCurrentUser();
    }

    static async register(user: NewUser) {
        const { data: token } = await axios.post<Token>(
            AuthEndpoints.register(),
            user,
            this.getHeaders()
        );

        localStorage.setItem('token', token.accessToken);

        return await this.getCurrentUser();
    }

    static async getCurrentUser() {
        return await axios.get<User>(
            AuthEndpoints.getCurrentUser(),
            this.getHeaders()
        );
    }
}
