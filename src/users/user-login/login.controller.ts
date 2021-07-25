import { endpoint } from "@src/endpoint";
import { Request, Response, Router } from "express";
import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes';
import { userMapper } from "../user.mapper";
import { loginService } from "./login.service";
import { validateLogin } from "./login.validator";

export const loginController = (router: Router) => {

    router.post(endpoint.login,
        validateLogin,
        async ({ body }: Request, res: Response): Promise<Response> => {
            try {
                const user = loginService.login(body)
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
