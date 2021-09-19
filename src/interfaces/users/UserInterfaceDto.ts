export interface UserDto {
  type: "user"
  userId: string
  firstName: string
  lastName: string
  admin: boolean
}

export interface LoginRequestDto {
  email?: string
  password?: string
}