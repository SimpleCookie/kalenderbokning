import { StatusCodes } from "http-status-codes";
import chai, { expect } from "chai"
import chaiHttp from "chai-http"
import { server } from "../../../src/app";
import { endpoint } from "../../../src/endpoint";

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);
const agent = chai.request.agent(server)
const baseUrl = "localhost:3003/api"

describe("Pinging the system", () => {
  it("Should return status 200 OK", async () => {
    const url = `/api${endpoint.ping}`
    const res = await agent.get(url)
    expect(res.status).to.eql(StatusCodes.OK)
    expect(res.body).to.eql({ message: "I am alive!" })
  })
})