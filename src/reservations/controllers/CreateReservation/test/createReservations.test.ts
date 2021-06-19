import { StatusCodes } from "http-status-codes"
import supertest from "supertest"
import { app } from "../../../../app"
import { endpoint } from "../../../../endpoint"
import { validateIsAuthenticated } from "../../../../users/validator/validateIsAuthenticated"
import { ReservationRequestDto } from "../../../interface/ReservationInterfaceDto"

jest.mock("../../../../users/validator/validateIsAuthenticated")
const mockValidateIsAuthenticated = validateIsAuthenticated as jest.Mock


describe("Reservations should accept", () => {
  it("Post to create a new reservation", async () => {
    mockValidateIsAuthenticated.mockImplementation((a, b, next) => {
      next()
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
    expect(res.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
  })
})