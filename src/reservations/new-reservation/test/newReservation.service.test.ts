import { NewReservation } from "@src/reservations/interface/reservation.interface";
import dayjs from "dayjs";
import { newReservationService } from "../newReservation.service";

const mockInsert = jest.fn()
jest.mock("@db", () => ({
  getDatabase: () => ({
    collection: () => ({
      insertOne: mockInsert
    })
  })
}))

describe("Creating a new reservation should", () => {
  it("save the entry to the database and return it", async () => {
    const reservationDto: NewReservation = {
      type: "new_reservation",
      bookedBy: "Johnns",
      entity: "Skola",
      starttime: dayjs("2021-06-06").toISOString(),
      endtime: dayjs("2021-06-06").toISOString(),
    }

    const reservation = await newReservationService.create(reservationDto)

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
