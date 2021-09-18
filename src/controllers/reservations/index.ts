import { newReservationController } from "@src/controllers/reservations/NewReservation/newReservationController"
import { Router } from "express"

export const useReservationControllers = (router: Router) => {
  newReservationController(router)
}
