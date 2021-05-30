import { NextFunction, Request, Response } from "express"
import Ajv, { JSONSchemaType } from "ajv"

interface Login {
  email: string
  password: string
}

const schema: JSONSchemaType<Login> = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 4 }
  },
  required: ["email", "password"],
  additionalProperties: false,
}

const ajv = new Ajv()
export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const validate = ajv.compile(schema)

  if (!validate(req)) {
    res.status(403).send({ error: `Invalid user credentials` });
    return
  }
  next();
}

