import { endpoint } from "@api/endpoint";
import { createReservationMapper } from "@api/reservations/controllers/CreateReservation/CreateReservationMapper";
import { reservationService } from "@api/reservations/service/reservationService";
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
                const request = createReservationMapper.fromCreationDto(body)
                const reservation = await reservationService.create(request)
                const reservationDto = createReservationMapper.toDto(reservation)
                return res.status(StatusCodes.OK).send(reservationDto)
            } catch (error) {
                console.error(error)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
            }
        })
}