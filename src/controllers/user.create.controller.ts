import { Request, Response } from 'express';
import { UserService } from '../services/user.create.service';

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    try {
      const user = await userService.createUser(name, email, password);
      res.status(201).json({...user, password: undefined});
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}