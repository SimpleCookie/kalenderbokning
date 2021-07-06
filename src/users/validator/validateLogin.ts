import { emailRegExp, getValidationMsg } from "@api/controllerUtilities"
import { LoginRequestDto } from "@api/users/interface/UserInterfaceDto"
import { NextFunction, Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

export const validateLogin = (request: Request, res: Response, next: NextFunction) => {
  const body: LoginRequestDto = request.body
  try {
    if (!body.email || !emailRegExp(body.email)) {
      throw new Error("Email missing or invalid")
    }
    if (!body.password || body.password.length < 4) {
      throw new Error("Password missing or invalid")
    }
  } catch (error) {
    console.error(error)
    res.status(StatusCodes.FORBIDDEN).send(getValidationMsg(ReasonPhrases.FORBIDDEN));
    return
  }
  next();
}

