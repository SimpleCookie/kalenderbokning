import { Router } from "express"
import { newReservationController } from "./controllers/CreateReservation/newReservationController"

export const useReservationControllers = (router: Router) => {
  newReservationController(router)
}