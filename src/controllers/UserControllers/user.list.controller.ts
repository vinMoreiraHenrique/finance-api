import { Request, Response } from "express";
import { ListUserService } from "../../services/user.list.service";

const userService = new ListUserService();

export class ListUserController {
  async listUsers(req: Request, res: Response): Promise<void> {
    const { name, email, active } = req.query;

    const activeBool = active === 'true' ? true : active === 'false' ? false : undefined;
    try {
      const users = await userService.listUsers(name as string, email as string, activeBool);
      res.status(200).json(users);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }
}
