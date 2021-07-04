import { CreateReservation } from "@api/reservations/interface/ReservationInterface";
import { reservationService } from "@api/reservations/service/reservationService";
import { getDatabase } from "@api/storage/db";
import dayjs from "dayjs";

jest.mock("@api/storage/db")
const mockGetDatabase = getDatabase as jest.Mock

describe("Reservations should change when", () => {
  it("creates a new reservation", async () => {
    let insertOneIsCalled = 0
    mockGetDatabase.mockImplementation(() => {
      return {
        collection: () => ({
          insertOne: () => {
            insertOneIsCalled++
            return {
              insertedId: 'test'
            }
          }
        })
      }
    })
    const reservationDto: CreateReservation = {
      type: "create_reservation",
      bookedBy: "Johnns",
      entity: "Skola",
      starttime: dayjs("2021-06-06").toISOString(),
      endtime: dayjs("2021-06-06").toISOString(),
    }

    const reservation = await reservationService.create(reservationDto)
    expect(reservation).toMatchObject({ bookedBy: "Johanns", id: "test" })
    expect(insertOneIsCalled).toStrictEqual(1)
  })
})