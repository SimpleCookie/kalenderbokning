import { NewReservation } from "@api/reservations/interface/ReservationInterface";
import { reservationService } from "@api/reservations/service/reservationService";
import { getDatabase } from "@api/storage/db";
import dayjs from "dayjs";

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
    const reservationDto: NewReservation = {
      type: "new_reservation",
      bookedBy: "Johnns",
      entity: "Skola",
      starttime: dayjs("2021-06-06").toISOString(),
      endtime: dayjs("2021-06-06").toISOString(),
    }

    const reservation = await reservationService.create(reservationDto)
    expect(reservation).toStrictEqual(expect.objectContaining({ bookedBy: "Johanns", id: "test" }))
    expect(insertOneIsCalled).toStrictEqual(1)
  })
})