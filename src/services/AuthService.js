import { Users } from '../models/users.model.js';
import bcrypt from 'bcrypt';

export default class AuthService {
  constructor() {
    this.role = 'user';
    this.status = 'active';
    this.saltLevel = 10;
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(this.saltLevel);
    return await bcrypt.hash(password, salt);
  }

  async addNewUser(email, hashPassword, name) {
    return await Users.create({
      email: email,
      password: hashPassword,
      name: name,
      role: this.role,
      status: this.status,
    });
  }

  async findUser(email) {
    const user = await Users.findOne({ where: { email } });
    if (user) {
      return user;
    }
  }

  async validPasswords(email, password) {
    const user = await this.findUser(email);
    return await bcrypt.compare(password, user.password);
  }

  async findUserById(userId) {
    return await Users.findOne({ where: { id: userId } });
  }
}
