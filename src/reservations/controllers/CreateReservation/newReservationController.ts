import { endpoint } from "@api/endpoint";
import { newReservationMapper } from "@api/reservations/controllers/CreateReservation/newReservationMapper";
import { reservationService } from "@api/reservations/service/reservationService";
import { validateNewReservation } from "@api/reservations/validator/validateReservationRequest";
import { validateIsAuthenticated } from "@api/users/validator/validateIsAuthenticated";
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