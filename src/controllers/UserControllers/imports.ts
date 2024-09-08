import { CreateUserController } from "./user.create.controller";
import { ListUserController } from "./user.list.controller";
import { RetrieveUserController } from "./user.retrieve.controller";


//instancers
export const UserController = {
    createUser: new CreateUserController().createNewUser,
    retrieveUser: new RetrieveUserController().getUserById,
    listUsers: new ListUserController().listUsers
} 