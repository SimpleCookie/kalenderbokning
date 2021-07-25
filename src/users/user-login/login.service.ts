import { User, UserCrendentials } from "../interface/user.interface"

export const loginService = {

  login: (userCredentials: UserCrendentials): User | undefined => {
    throw new Error("Not implemented")
  }
}
