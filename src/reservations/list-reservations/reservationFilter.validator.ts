import { getValidationMsg } from "@src/controllerUtilities"
import dayjs from "dayjs"
import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { ListReservationFilter } from "../interface/reservation.interface"

export const validateReservationFilter = (request: Request, res: Response, next: NextFunction) => {
  const body: ListReservationFilter = request.body

  try {
    const timestamp = dayjs(body.timestamp)
    if (!timestamp.isValid()) {
      throw new Error("timestamp is not a valid ISO 8601 date string")
    }
  } catch (error) {
    console.error(error)
    res.status(StatusCodes.BAD_REQUEST).send(getValidationMsg(error));
    return
  }
  next();
}
