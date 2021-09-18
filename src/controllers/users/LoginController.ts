import { userMapper } from "@src/controllers/users/userMapper";
import { endpoint } from "@src/endpoint";
import { UserService } from "@src/services/users/UserService";
import { validateLogin } from "@src/validators/users/validateLogin";
import { Request, Response, Router } from "express";
import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes';

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
