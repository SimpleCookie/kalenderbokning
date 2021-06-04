import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { StatusCodes } from "http-status-codes";
import sinon from "sinon";
import { server } from "../src/app";
import { endpoint } from "../src/endpoint";
import { ReservationRequestDto } from "../src/reservations/interface/ReservationInterfaceDto";
import { ReservationService } from "../src/reservations/service/ReservationService";
import * as loginValidator from "../src/users/validator/validateIsAuthenticated";

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);
const agent = chai.request.agent(server)

describe("Reservations should accept", () => {
  it("Post to create a new reservation", async () => {

    const url = `/api${endpoint.reservations}`
    const body: ReservationRequestDto = {
      bookingInfo: {
        bookedBy: "Johnns",
        entity: "Skola",
        starttime: new Date().toISOString(),
        endtime: new Date().toISOString(),
      }
    }
    const stub = sinon.stub().returns({ foo: "hej" })
    const loginStub = sinon.stub().callsFake((a: any, b: any, next: () => void) => next())

    sinon.replace(ReservationService, "create", stub)
    sinon.replace(loginValidator, "validateIsAuthenticated", loginStub)

    const res = await agent.post(url).send(body)
    expect(res.status).to.eql(StatusCodes.OK)
    expect(res.body).to.eql({ foo: "hej" })
  })
})