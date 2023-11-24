import AuthService from '../services/AuthService.js';

const authService = new AuthService();

export default class AuthController {
  async registersUser(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const hashPassword = await authService.hashPassword(password);
      try {
        const newUser = await authService.addNewUser(email, hashPassword, name);

        // /////////// elastic start ////////////
        // const client = req.app.get('client');

        // await client.index({
        //   index: 'users',
        //   id: newUser.id,
        //   body: { id: newUser.id, name: newUser.name },
        // });

        // /////////// elastic end //////////////

        return res.status(201).end();
      } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
          return res.status(400).json({ message: 'This User already exists' });
        }
      }
    } catch (err) {
      next(err);
    }
  }

  async getUserStatus(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await authService.findUserById(userId);
      return res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  }
}
