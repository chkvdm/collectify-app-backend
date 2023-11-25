import UsersService from '../services/UserService.js';
const usersService = new UsersService();

export default class UsersController {
  async getUsers(req, res, next) {
    try {
      const allUsers = await usersService.allUsers();
      const filterUsersDataPromises = allUsers.map(async (el) => ({
        id: el.id,
        name: el.name,
        email: el.email,
        role: el.role,
        status: el.status,
      }));
      const filterUsersData = await Promise.all(filterUsersDataPromises);
      return res.status(200).json({ users: filterUsersData });
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { users } = req.body;
      users.forEach(async (user) => {
        await usersService.updateUsers(user);
      });
      return res.status(201).end();
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.body;
      await usersService.deleteUserById(id);
      const client = req.app.get('client');
      await client.deleteByQuery({
        index: '_all',
        body: {
          query: {
            query_string: {
              query: id,
            },
          },
        },
      });
      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}
