import Ajv, { JSONSchemaType } from "ajv"
import { NextFunction, Request, Response } from "express"
import { ReservationRequestDto } from "../interface/ReservationInterfaceDto"

const schema: JSONSchemaType<ReservationRequestDto> = {
  type: "object",
  properties: {
    bookingInfo: {
      type: "object",
      properties: {
        bookedBy: { type: "string", minLength: 4 },
        entity: { type: "string", minLength: 4 },
        starttime: { type: "string", minLength: 24, maxLength: 24 },
        endtime: { type: "string", minLength: 24, maxLength: 24 },
      },
      required: ["bookedBy", "entity", "starttime", "endtime"],
      additionalProperties: false,
    },
    password: { type: "string", minLength: 4 }
  },
  required: ["bookingInfo"],
  additionalProperties: false,
}

const ajv = new Ajv()
export const validateReservationRequest = ({ body }: Request, res: Response, next: NextFunction) => {
  const validate = ajv.compile(schema)

  if (!validate(body)) {
    res.status(403).send({ error: `Invalid user credentials` });
    console.error("Bad request")
    return
  }
  next();
}

