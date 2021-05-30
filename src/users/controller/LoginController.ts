import { Application, Request, Response } from "express"
import { validateLogin } from "../validator/LoginValidator"

export const LoginController = (app: Application) => {
    const name = "UserController"
    console.log(`Initiated ${name}`)

    app.post("/v1/user/login",
        validateLogin,
        async (req: Request, res: Response): Promise<Response> => {
            console.log("request", req)
            return res.status(200).send({
                message: "You are logged in!",
            })
        })
}