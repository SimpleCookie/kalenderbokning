import { Request, Response, Router } from "express";
import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes';
import { endpoint } from "../../endpoint";
import { UserService } from "../service/UserService";
import { validateLogin } from "../validator/validateLogin";
import { userMapper } from "./userMapper";

export const LoginController = (router: Router) => {

    router.post(endpoint.login,
        validateLogin,
        async ({ body }: Request, res: Response): Promise<Response> => {
            try {
                const user = UserService.login(body)
                if (!user) {
                    return res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN)
                }
                const userDto = userMapper.toDto(user)
                return res.status(StatusCodes.OK).send(userDto)
            } catch (error) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
            }
        })
}