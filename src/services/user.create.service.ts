import { User } from "@prisma/client";
import { UserRepository } from "../repositories/index";

export class CreateUserService {
  private userRepository = new UserRepository();


  async createUser(name: string, email: string, password: string): Promise<User> {
    const user = this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    return this.userRepository.create(name, email, password);
  }
}
