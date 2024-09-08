import { Request, Response } from "express";
import { CreateUserService } from "../../services/user.create.service";

const userService = new CreateUserService();

export class CreateUserController {
  async createNewUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    try {
      const user = await userService.createUser(name, email, password);
      res.status(201).json({ ...user, password: undefined });
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message.toString() });
    }
  }

}
