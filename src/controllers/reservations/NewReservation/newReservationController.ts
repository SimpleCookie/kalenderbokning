import { newReservationMapper } from "@src/controllers/reservations//NewReservation/newReservationMapper";
import { endpoint } from "@src/endpoint";
import { reservationService } from "@src/services/reservations//reservationService";
import { validateNewReservation } from "@src/validators/reservations//validateReservationRequest";
import { validateIsAuthenticated } from "@src/validators/users//validateIsAuthenticated";
import { Request, Response, Router } from "express";
import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes';

export const newReservationController = (router: Router) => {

    router.post(endpoint.reservations,
        validateIsAuthenticated,
        validateNewReservation,
        async ({ body }: Request, res: Response): Promise<Response> => {
            try {
                const request = newReservationMapper.fromCreationDto(body)
                const reservation = await reservationService.create(request)
                const reservationDto = newReservationMapper.toDto(reservation)
                return res.status(StatusCodes.OK).send(reservationDto)
            } catch (error) {
                console.error(error)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
            }
        })
}
