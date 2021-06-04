import { NextFunction, Request, Response } from "express"
import Ajv, { JSONSchemaType } from "ajv"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { LoginRequestDto } from "../interface/UserInterfaceDto"

const schema: JSONSchemaType<LoginRequestDto> = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 4 }
  },
  required: ["email", "password"],
  additionalProperties: false,
}

const ajv = new Ajv()
export const validateLogin = ({ body }: Request, res: Response, next: NextFunction) => {
  const validate = ajv.compile(schema)

  if (!validate(body)) {
    res.status(StatusCodes.FORBIDDEN).send({ error: ReasonPhrases.FORBIDDEN });
    return
  }
  next();
}
