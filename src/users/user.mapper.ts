import { User } from "@src/users/interface/user.interface";
import { UserDto } from "@src/users/interface/user.interface.dto";

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
