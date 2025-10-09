import { AbstractService } from '../AbstractService';
import { AuthEndpoints } from './AuthEndpoints';
import axios from 'axios';
import { Credentials, NewUser, Token } from '../../models/auth';
import { User } from '../../models/user';
import qs from 'qs';

export class AuthService extends AbstractService {
    static async login(credentials: Credentials) {
        console.log(credentials);

        const { data: token } = await axios.post<Token>(
            AuthEndpoints.login(),
            qs.stringify({
                username: credentials.email, // OAuth2PasswordRequestForm expects `username`
                password: credentials.password,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
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
