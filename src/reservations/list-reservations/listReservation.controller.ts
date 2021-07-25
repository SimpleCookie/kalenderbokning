import { endpoint } from "@src/endpoint";
import { validateIsAuthenticated } from "@src/users/validator/isAuthenticated.validator";
import { Request, Response, Router } from "express";
import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes';
import { ListReservationFilter } from "../interface/reservation.interface";
import { reservationMapper } from "../reservation.mapper";
import { listReservationService } from "./listReservation.service";
import { validateReservationFilter } from "./reservationFilter.validator";

export const listReservationController = (router: Router) => {

    router.get(endpoint.reservations,
        validateIsAuthenticated,
        validateReservationFilter,
        async (request: Request, res: Response): Promise<Response> => {
            try {
                const filter = request.query as unknown as ListReservationFilter
                const reservations = await listReservationService.list(filter)
                const reservationDtos = reservations.map(reservationMapper.toReservationDto)
                return res.status(StatusCodes.OK).send(reservationDtos)
            } catch (error) {
                console.error(error)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
            }
        })
}
