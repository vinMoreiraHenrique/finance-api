import { User } from "@prisma/client";
import { UserRepository } from "../repositories/index";

export class ListUserService {
  private userRepository = new UserRepository();

  async listUsers(name: string, email: string, active: boolean | undefined): Promise<User[]> {
    const users = this.userRepository.list(email, name, active);

    return users;
  }
}
