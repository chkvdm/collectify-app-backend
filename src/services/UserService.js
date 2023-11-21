import { Users } from '../models/users.model.js';

export default class UsersService {
  async allUsers() {
    return await Users.findAll();
  }

  async updateUsers(user) {
    await Users.update(
      { role: user.role, status: user.status },
      {
        where: {
          id: user.id,
        },
      }
    );
  }

  async deleteUserById(id) {
    await Users.destroy({ where: { id } });
  }
}
