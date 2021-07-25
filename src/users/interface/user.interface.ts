export interface User {
  type: "user"
  userId: string
  firstName: string
  lastName: string
  admin: boolean
}
export interface UserCrendentials {
  email: string
  password: string
}