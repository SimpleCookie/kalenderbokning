import { app } from "@api/app"
import { endpoint } from "@api/endpoint"
import { ReservationRequestDto } from "@api/reservations/interface/ReservationInterfaceDto"
import { ReservationService } from "@api/reservations/service/ReservationService"
import { validateIsAuthenticated } from "@api/users/validator/validateIsAuthenticated"
import { StatusCodes } from "http-status-codes"
import supertest from "supertest"

jest.mock("@api/users/validator/validateIsAuthenticated")
const mockValidateIsAuthenticated = validateIsAuthenticated as jest.Mock

jest.mock("@api/reservations/service/ReservationService")
const mockReservationService = ReservationService.create as jest.Mock


describe("Reservations should accept", () => {
  it("Post to create a new reservation", async () => {
    mockValidateIsAuthenticated.mockImplementation((a, b, next) => {
      next()
    })
    mockReservationService.mockImplementation(() => {
      return body
    })
    const url = `/api${endpoint.reservations}`
    const body: ReservationRequestDto = {
      bookingInfo: {
        bookedBy: "Johnns",
        entity: "Skola",
        starttime: new Date().toISOString(),
        endtime: new Date().toISOString(),
      }
    }

    const res = await supertest(app).post(url).send(body)
    expect(res.status).toBe(StatusCodes.OK)
  })
})