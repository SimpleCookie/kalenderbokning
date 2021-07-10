import { app } from "@src/app";
import { endpoint } from "@src/endpoint";
import dayjs from "dayjs";
import { StatusCodes } from "http-status-codes";
import supertest from "supertest";
import { reservationBuilder } from "../builders/reservationBuilder";

const reservationUrl = `/api${endpoint.reservations}`
const mockInsert = jest.fn()
jest.mock("@db", () => ({
  getDatabase: () => ({
    collection: () => ({
      insertOne: mockInsert
    })
  })
}))

describe("Creating a new reservation", () => {
  it("Should return the new reservation", async () => {
    const newReservation = reservationBuilder.dto.newReservation({
      starttime: dayjs().add(1, "day").toJSON(),
      endtime: dayjs().add(2, "day").toJSON(),
    })
    const res = await supertest(app)
      .post(reservationUrl)
      .send(newReservation)
      .set("Cookie", "_token=test;")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(StatusCodes.OK)

    expect(mockInsert).toBeCalledTimes(1)
    expect(res.body).toStrictEqual({
      id: "uuid-1",
      type: "reservation",
      starttime: newReservation.starttime,
      endtime: newReservation.endtime,
      bookedBy: newReservation.bookedBy,
      entity: newReservation.entity,
    })
  })
})