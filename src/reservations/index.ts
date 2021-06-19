import { Router } from "express"
import { CreateReservationController } from "./controllers/CreateReservation/CreateReservationController"

export const useReservationControllers = (router: Router) => {
  CreateReservationController(router)
}