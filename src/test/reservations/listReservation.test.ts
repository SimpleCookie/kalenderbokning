import { app } from "@src/app";
import { endpoint } from "@src/endpoint";
import { reservationMapper } from "@src/reservations/reservation.mapper";
import dayjs from "dayjs";
import { StatusCodes } from "http-status-codes";
import supertest from "supertest";
import { v4 as uuidv4 } from "uuid";
import { reservationBuilder } from "../builders/reservation.builder";

const reservationUrl = `/api${endpoint.reservations}`
const mockFind = jest.fn()
jest.mock("@db", () => ({
  getDatabase: () => ({
    collection: () => ({
      find: mockFind
    })
  })
}))

describe("Listing available reservations", () => {
  it.skip("Should list reservations a entity", async () => {
    const timestamp = dayjs("2021-06-06").toJSON()
    const entity = "3D-skrivare"
    const reservation1 = reservationBuilder.int.reservation({
      bookedBy: "Marcus",
      entity,
      id: uuidv4(),
    })
    const reservation2 = reservationBuilder.int.reservation({
      bookedBy: "Johanns",
      entity,
      id: uuidv4(),
    })

    mockFind.mockReturnValue([reservation1, reservation2])

    const res = await supertest(app)
      .get(reservationUrl)
      .query({ timestamp, entity })
      .set("Cookie", "_token=test;")
      .set('Accept', 'application/json')
      .expect(StatusCodes.OK)

    expect(mockFind).toBeCalledWith(expect.objectContaining({ timestamp, entity }))
    expect(res.body).toStrictEqual([
      reservationMapper.toReservationDto(reservation1),
      reservationMapper.toReservationDto(reservation2),
    ])
  })
  it("Should list reservations for a date", async () => {
    const timestamp = dayjs("2021-06-06").toJSON()
    const entity = "3D-skrivare"
    const reservation1 = reservationBuilder.int.reservation({
      bookedBy: "Marcus",
      entity,
      id: uuidv4(),
    })
    const reservation2 = reservationBuilder.int.reservation({
      bookedBy: "Johanns",
      entity,
      id: uuidv4(),
    })

    mockFind.mockReturnValue({ toArray: () => [reservation1, reservation2]})

    const res = await supertest(app)
      .get(reservationUrl)
      .query({ timestamp })
      .set("Cookie", "_token=test;")
      .set('Accept', 'application/json')
      .expect(StatusCodes.OK)

    expect(mockFind).toBeCalledWith(expect.objectContaining({ timestamp }))
    expect(res.body).toStrictEqual([
      reservationMapper.toReservationDto(reservation1),
      reservationMapper.toReservationDto(reservation2),
    ])
  })
})
