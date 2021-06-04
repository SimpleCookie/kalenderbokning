import { StatusCodes } from "http-status-codes";
import supertest from "supertest";
import { app } from "../app";
import { endpoint } from "../endpoint";

describe("Pinging the system", () => {
  it("Should return status 200 OK", async () => {
    const url = `/api${endpoint.ping}`
    const res = await supertest(app).get(url)

    expect(res.status).toBe(StatusCodes.OK)
    expect(res.body).toStrictEqual({ message: "I am alive!" })
  })
})