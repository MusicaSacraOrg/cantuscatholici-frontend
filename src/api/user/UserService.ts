import { AbstractService } from '@musica-sacra/api';
import { UserEndpoints } from './UserEndpoints';
import axios from 'axios';
import { User } from '../../models/user';

export class UserService extends AbstractService {
    static async getUser(id: string) {
        return await axios.get<User>(
            UserEndpoints.getUser(id),
            this.getHeaders()
        );
    }
}
