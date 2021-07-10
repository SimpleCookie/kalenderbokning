import { app } from "@api/app";
import { endpoint } from "@api/endpoint";
import dayjs from "dayjs";
import { StatusCodes } from "http-status-codes";
import supertest from "supertest";
import { reservationBuilder } from "../builders/reservationBuilder";

const reservationUrl = `/api${endpoint.reservations}`
describe("Pinging the system", () => {
  it("Should return status 200 OK", async () => {
    const body = reservationBuilder.dto.newReservation({
      starttime: dayjs().add(1, "day").toJSON(),
      endtime: dayjs().add(2, "day").toJSON(),
    })
    const res = await supertest(app)
      .post(reservationUrl)
      .send(body)
      .set("Cookie", "_token=test;")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(StatusCodes.OK)

    expect(res.body).toStrictEqual({ message: "I am alive!" })
  })
})