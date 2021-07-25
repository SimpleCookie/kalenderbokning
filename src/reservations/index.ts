import { Router } from "express"
import { listReservationController } from "./list-reservations/listReservation.controller"
import { newReservationController } from "./new-reservation/newReservation.controller"

export const useReservationControllers = (router: Router) => {
  newReservationController(router)
  listReservationController(router)
}
