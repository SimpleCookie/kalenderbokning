import { app } from "@src/app";
import { endpoint } from "@src/endpoint";
import { reservationMapper } from "@src/reservations/reservation.mapper";
import dayjs from "dayjs";
import { StatusCodes } from "http-status-codes";
import supertest from "supertest";
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
  it.skip("Should return the list", async () => {
    const starttime = dayjs("2021-06-06").toJSON()
    const endtime = dayjs("2021-06-07").toJSON()
    const entity = "3D-skrivare"
    const reservation1 = reservationBuilder.int.reservation({
      bookedBy: "Marcus",
      entity,
      id: "uuid-1",
      starttime: dayjs(starttime).hour(8).toJSON(),
      endtime: dayjs(endtime).hour(9).toJSON(),
    })
    const reservation2 = reservationBuilder.int.reservation({
      bookedBy: "Johanns",
      entity,
      id: "uuid-2",
      starttime: dayjs(starttime).hour(11).toJSON(),
      endtime: dayjs(endtime).hour(13).toJSON(),
    })
    mockFind.mockReturnValue([reservation1, reservation2])

    const res = await supertest(app)
      .get(reservationUrl)
      .query({ entity, starttime, endtime })
      .set("Cookie", "_token=test;")
      .set('Accept', 'application/json')
      .expect(StatusCodes.OK)

    expect(mockFind).toBeCalledTimes(1)
    expect(res.body).toStrictEqual([
      reservationMapper.toReservationDto(reservation1),
      reservationMapper.toReservationDto(reservation2),
    ])
  })
})
