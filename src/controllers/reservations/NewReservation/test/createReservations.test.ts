import { app } from "@src/app"
import { endpoint } from "@src/endpoint"
import { Reservation } from "@src/interfaces/reservations/ReservationInterface"
import { reservationService } from "@src/services/reservations/reservationService"
import { reservationBuilder } from "@src/testRequests/builders/reservationBuilder"
import dayjs from "dayjs"
import { StatusCodes } from "http-status-codes"
import supertest from "supertest"
import { v4 as uuidv4 } from "uuid"

jest.mock("@src/services/reservations/reservationService")
const mockReservationService = reservationService.create as jest.Mock

const testUrl = `/api${endpoint.reservations}`

describe("Reservations should accept", () => {
  it("Post to create a new reservation", async () => {
    const body = reservationBuilder.dto.newReservation({
      starttime: dayjs().add(1, "day").toJSON(),
      endtime: dayjs().add(2, "day").toJSON(),
    })
    const newReservation: Reservation = {
      _id: uuidv4(),
      type: "reservation",
      bookedBy: body.bookedBy!,
      starttime: body.starttime!,
      endtime: body.endtime!,
      entity: body.entity!,
    }
    mockReservationService.mockResolvedValue(newReservation)

    const res = await supertest(app)
      .post(testUrl)
      .set("Cookie", "_token=test;")
      .send(body)

    expect(res.status).toStrictEqual(StatusCodes.OK)
  })
})
