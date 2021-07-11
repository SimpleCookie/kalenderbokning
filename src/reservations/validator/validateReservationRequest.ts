import { getValidationMsg } from "@src/controllerUtilities"
import { NewReservationDto } from "@src/reservations/interface/ReservationInterfaceDto"
import dayjs from "dayjs"
import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export const validateNewReservation = (request: Request, res: Response, next: NextFunction) => {
  const body: NewReservationDto = request.body

  try {
    if (!body.bookedBy || body.bookedBy.length < 3) {
      throw new Error("bookedBy invalid or less than 3 characters")
    }
    if (!body.entity || body.entity.length < 3) {
      throw new Error("entity invalid or less than 3 characters")
    }
    const starttime = dayjs(body.starttime)
    if (!starttime.isValid() || starttime.isBefore(dayjs())) {
      throw new Error("starttime invalid or in the past")
    }
    const endtime = dayjs(body.endtime)
    if (!endtime.isValid() || endtime.isBefore(starttime)) {
      throw new Error("endtime invalid or before starttime")
    }
  } catch (error) {
    console.error(error)
    res.status(StatusCodes.BAD_REQUEST).send(getValidationMsg(error));
    return
  }
  next();
}

