import { Request, Response, Router } from "express"
import { endpoint } from "./endpoint"
import { useReservationControllers } from "./reservations"
import { useUserControllers } from "./users"

export const router = Router()

router.get(endpoint.ping, async (_req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "I am alive!",
  })
})

useUserControllers(router)
useReservationControllers(router)

