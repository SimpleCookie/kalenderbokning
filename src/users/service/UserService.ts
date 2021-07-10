import { User, UserCrendentials } from "@src/users/interface/UserInterface"

export class UserService {

  static getUsers(): User[] {
    throw new Error("Method not implemented.")
  }

  static getUser(id: string): User | undefined {
    throw new Error("Method not implemented.")
  }

  static login(userCredentials: UserCrendentials): User | undefined {
    throw new Error("Method not implemented.")
  }
}