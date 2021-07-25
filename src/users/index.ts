import { Router } from "express"
import { loginController } from "./user-login/login.controller"

export const useUserControllers = (router: Router) => {
  loginController(router)
}
