import { Router } from "express"
import { ReservationController } from "./controller/ReservationController"

export const useReservationControllers = (router: Router) => {
  ReservationController(router)
}