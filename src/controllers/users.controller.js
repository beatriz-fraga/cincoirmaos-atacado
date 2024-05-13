import { UsersRepository } from "../repositories/users.repository.js";

export class UsersController {
  static instance;
  constructor() {
    this.repository = new UsersRepository();
  }

  getUser = async (req, res) => {
    const id = req.user.userId;
    const user = await this.repository.getUser(id);
    return res.json(user);
  };

  createUser = async (req, res) => {
    const user = req.body;

    const createdUser = await this.repository.createUser(user);

    return res.json(createdUser);
  };

  updateUser = async (req, res) => {
    const id = req.user.userId;
    const user = req.body;

    const userUpdated = await this.repository.updateUser({ id, ...user });

    return res.json(userUpdated);
  };

  deleteUser = async (req, res) => {
    const id = req.user.userId;

    await this.repository.deleteUser(id);

    return res.json({ ok: true });
  };
}
