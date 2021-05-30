import { User } from "../interface/UserInterface";
import { UserDto } from "../interface/UserInterfaceDto";

export const userMapper = {
  toDto: (user: User): UserDto => {
    try {
      return ({
        type: "user",
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin,
      });
    } catch (error) {
      console.error("Fail to map user to dto", user)
      throw error
    }
  },
  fromDto: (user: UserDto): User => {
    try {
      return ({
        type: "user",
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin,
      });
    } catch (error) {
      console.error("Fail to map user from dto", user)
      throw error
    }
  }
}