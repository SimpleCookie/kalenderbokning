import { app } from "@api/app"
import { endpoint } from "@api/endpoint"
import { CreateReservationDto } from "@api/reservations/interface/ReservationInterfaceDto"
import { reservationService } from "@api/reservations/service/reservationService"
import { validateIsAuthenticated } from "@api/users/validator/validateIsAuthenticated"
import dayjs from "dayjs"
import { StatusCodes } from "http-status-codes"
import supertest from "supertest"

jest.mock("@api/users/validator/validateIsAuthenticated")
const mockValidateIsAuthenticated = validateIsAuthenticated as jest.Mock

jest.mock("@api/reservations/service/reservationService")
const mockReservationService = reservationService.create as jest.Mock


describe("Reservations should accept", () => {
  it("Post to create a new reservation", async () => {
    mockValidateIsAuthenticated.mockImplementation((a, b, next) => {
      next()
    })
    mockReservationService.mockImplementation(async () => {
      return body
    })
    const url = `/api${endpoint.reservations}`
    const body: CreateReservationDto = {
      bookedBy: "Johnns",
      entity: "Skola",
      starttime: dayjs("2021-06-06").toISOString(),
      endtime: dayjs("2021-06-06").toISOString(),
    }

    const res = await supertest(app).post(url).send(body)
    expect(res.status).toBe(StatusCodes.OK)
  })
})