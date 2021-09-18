import { LoginController } from "@src/controllers/users/LoginController"
import { Router } from "express"

export const useUserControllers = (router: Router) => {
  LoginController(router)
}
