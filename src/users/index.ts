import { Router } from "express"
import { LoginController } from "./controller/LoginController"

export const useUserControllers = (router: Router) => {
  LoginController(router)
}