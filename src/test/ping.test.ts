import { app } from "@api/app";
import { endpoint } from "@api/endpoint";
import { StatusCodes } from "http-status-codes";
import supertest from "supertest";

describe("Pinging the system", () => {
  it("Should return status 200 OK", async () => {
    const url = `/api${endpoint.ping}`
    const res = await supertest(app).get(url)

    expect(res.status).toBe(StatusCodes.OK)
    expect(res.body).toStrictEqual({ message: "I am alive!" })
  })
})