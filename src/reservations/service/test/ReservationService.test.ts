import { ReservationRequestDto } from "@api/reservations/interface/ReservationInterfaceDto";
import { ReservationService } from "@api/reservations/service/ReservationService";
import { getDatabase } from "@api/storage/db";

jest.mock("@api/users/validator/validateIsAuthenticated")
const mockGetDatabase = getDatabase as jest.Mock

describe("Reservations should change when", () => {
  it("creates a new reservation", async () => {
    let insertOneIsCalled = 0
    mockGetDatabase.mockImplementation(() => {
      return {
        collection: () => ({
          insertOne: () => {
            insertOneIsCalled++
          }
        })
      }
    })
    const reservationDto: ReservationRequestDto = {
      bookingInfo: {
        bookedBy: "Johnns",
        entity: "Skola",
        starttime: new Date().toISOString(),
        endtime: new Date().toISOString(),
      }
    }

    const reservation = await ReservationService.create(reservationDto)
    expect(reservation.bookingInfo.bookedBy).toBe('Johnns')
    expect(insertOneIsCalled).toBe(1)
  })
})