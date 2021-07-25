import { endpoint } from "@src/endpoint";
import { validateIsAuthenticated } from "@src/users/validator/isAuthenticated.validator";
import { Request, Response, Router } from "express";
import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes';
import { reservationMapper } from "../reservation.mapper";
import { newReservationService } from "./newReservation.service";
import { validateNewReservation } from "./reservationRequest.validator";

export const newReservationController = (router: Router) => {

    router.post(endpoint.reservations,
        validateIsAuthenticated,
        validateNewReservation,
        async ({ body }: Request, res: Response): Promise<Response> => {
            try {
                const request = reservationMapper.toNewReservation(body)
                const reservation = await newReservationService.create(request)
                const reservationDto = reservationMapper.toReservationDto(reservation)
                return res.status(StatusCodes.OK).send(reservationDto)
            } catch (error) {
                console.error(error)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
            }
        })
}
