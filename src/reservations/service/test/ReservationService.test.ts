import { NewReservation } from "@src/reservations/interface/ReservationInterface";
import { reservationService } from "@src/reservations/service/reservationService";
import dayjs from "dayjs";

const mockInsert = jest.fn()
jest.mock("@db", () => ({
  getDatabase: () => ({
    collection: () => ({
      insertOne: mockInsert
    })
  })
}))

describe("Reservations should change when", () => {
  it("creates a new reservation", async () => {
    const reservationDto: NewReservation = {
      type: "new_reservation",
      bookedBy: "Johnns",
      entity: "Skola",
      starttime: dayjs("2021-06-06").toISOString(),
      endtime: dayjs("2021-06-06").toISOString(),
    }

    const reservation = await reservationService.create(reservationDto)

    const expected = {
      type: "reservation",
      _id: "uuid-1",
      bookedBy: reservationDto.bookedBy,
      entity: reservationDto.entity,
      starttime: reservationDto.starttime,
      endtime: reservationDto.endtime,
    }
    expect(mockInsert).toBeCalledTimes(1)
    expect(mockInsert).toHaveBeenCalledWith(expected)
    expect(reservation).toStrictEqual(expected)
  })
})