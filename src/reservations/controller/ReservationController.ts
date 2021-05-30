import { Request, Response, Router } from "express"
import {
    ReasonPhrases,
    StatusCodes,
} from 'http-status-codes';
import { reservationMapper } from "./reservationMapper";
import { ReservationService } from "../service/ReservationService";
import { validateReservationRequest } from "../validator/validateReservationRequest";
import { validateIsAuthenticated } from "../../users/validator/validateIsAuthenticated";

export const ReservationController = (router: Router) => {
    const name = "ReservationController"
    console.log(`Initiated ${name}`)

    router.post("/v1/reservations",
        validateIsAuthenticated,
        validateReservationRequest,
        async ({ body }: Request, res: Response): Promise<Response> => {
            try {
                const reservation = ReservationService.create(body)
                if (!reservation) {
                    return res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN)
                }
                const reservationDto = reservationMapper.toDto(reservation)
                return res.status(StatusCodes.OK).send(reservationDto)
            } catch (error) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
            }
        })
}