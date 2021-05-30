import { Application } from "express"
import { LoginController } from "./controller/LoginController"

export const useUserControllers = (app: Application) => {
  LoginController(app)
}