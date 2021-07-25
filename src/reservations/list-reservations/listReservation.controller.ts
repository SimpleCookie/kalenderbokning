import { endpoint } from "@src/endpoint";
import { validateIsAuthenticated } from "@src/users/validator/validateIsAuthenticated";
import { Request, Response, Router } from "express";
import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes';
import { reservationMapper } from "../reservation.mapper";
import { listReservationService } from "./listReservation.service";
import { validateReservationFilter } from "./reservationFilter.validator";

export const listReservationController = (router: Router) => {

    router.post(endpoint.reservations,
        validateIsAuthenticated,
        validateReservationFilter,
        async ({ body }: Request, res: Response): Promise<Response> => {
            try {
                const request = reservationMapper.toFilter(body)
                const reservations = await listReservationService.list(request)
                const reservationDtos = reservations.map(reservationMapper.toReservationDto)
                return res.status(StatusCodes.OK).send(reservationDtos)
            } catch (error) {
                console.error(error)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
            }
        })
}
