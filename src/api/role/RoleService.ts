import { AbstractService } from '../AbstractService';
import axios from 'axios';
import { RoleEndpoints } from './RoleEndpoints';

export class RoleService extends AbstractService {
    static async getRoles() {
        return await axios.get(RoleEndpoints.getRoles(), this.getHeaders());
    }
}
