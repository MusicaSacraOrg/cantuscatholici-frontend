import { AbstractService } from '../AbstractService';
import { UserEndpoints } from './UserEndpoints';
import axios from 'axios';
import { User } from '../../models/user';

export class UserService extends AbstractService {
  /**
   * Fetch a single user by id.
   * For mocks, downloads the full users list and selects the matching record.
   * Returns a { data: User } shape for consistency with axios responses.
   * Throws an Error if the user is not found.
   */
  static async getUser(id: string) {
    // Fetch the users mock (the endpoint returns the whole array for mocks)
    const response = await axios.get<{ users: User[] }>(
      UserEndpoints.getUser(id),
      this.getHeaders(),
    );

    const user = response.data.users.find((u) => u.id.toString() === id);

    if (!user) {
      throw new Error('User not found');
    }

    return { data: user };
  }
}
