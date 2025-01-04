import { CreateUserController } from "./create.controller";
import { ListUserController } from "./list.controller";
import { RetrieveUserController } from "./retrieve.controller";

// Instancers
const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const retrieveUserController = new RetrieveUserController();

// Binds
export const UserController = {
  createUser: createUserController.createNewUser.bind(createUserController),
  retrieveUser: retrieveUserController.getUserById.bind(retrieveUserController),
  listUsers: listUserController.listUsers.bind(listUserController),
};