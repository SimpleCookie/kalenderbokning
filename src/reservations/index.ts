import { Router } from "express"
import { newReservationController } from "./controllers/NewReservation/newReservationController"

export const useReservationControllers = (router: Router) => {
  newReservationController(router)
}