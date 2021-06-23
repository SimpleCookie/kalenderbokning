import { endpoint } from "@api/endpoint";
import { createReservationMapper } from "@api/reservations/controllers/CreateReservation/CreateReservationMapper";
import { ReservationService } from "@api/reservations/service/ReservationService";
import { validateReservationRequest } from "@api/reservations/validator/validateReservationRequest";
import { validateIsAuthenticated } from "@api/users/validator/validateIsAuthenticated";
import { Request, Response, Router } from "express";
import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes';

export const CreateReservationController = (router: Router) => {

    router.post(endpoint.reservations,
        validateIsAuthenticated,
        validateReservationRequest,
        async ({ body }: Request, res: Response): Promise<Response> => {
            try {
                const reservation = await ReservationService.create(body)
                if (!reservation) {
                    return res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN)
                }
                const reservationDto = createReservationMapper.toDto(reservation)
                return res.status(StatusCodes.OK).send(reservationDto)
            } catch (error) {
                console.error(error)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
            }
        })
}