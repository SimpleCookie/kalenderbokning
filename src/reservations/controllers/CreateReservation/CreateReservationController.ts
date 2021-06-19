import { Request, Response, Router } from "express";
import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes';
import { endpoint } from "../../../endpoint";
import { validateIsAuthenticated } from "../../../users/validator/validateIsAuthenticated";
import { ReservationService } from "../../service/ReservationService";
import { validateReservationRequest } from "../../validator/validateReservationRequest";
import { createReservationMapper } from "./CreateReservationMapper";

export const CreateReservationController = (router: Router) => {

    router.post(endpoint.reservations,
        validateIsAuthenticated,
        validateReservationRequest,
        async ({ body }: Request, res: Response): Promise<Response> => {
            try {
                const reservation = ReservationService.create(body)
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