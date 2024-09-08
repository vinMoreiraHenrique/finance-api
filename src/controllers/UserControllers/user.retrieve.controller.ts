import { Request, Response } from "express";
import { RetrieveUserService } from "../../services/user.retrieve.service";

const userService = new RetrieveUserService();


export class RetrieveUserController {
    async getUserById(req: Request, res: Response): Promise<void> {
        const { uuid } = req.params;

        try {
            const user = await userService.retrieveUser(uuid);
            res.status(200).json({...user, password: undefined});
        } catch (error: any) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
}