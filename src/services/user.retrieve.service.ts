import { User } from "@prisma/client";
import { UserRepository } from "../repositories/index";

export class RetrieveUserService {
  private userRepository = new UserRepository();


  async retrieveUser(id: string): Promise<User | null> {
    const user = this.userRepository.find(id);

    if (!user) {
      throw new Error("User not found");
    }  

    return user
  }
}
