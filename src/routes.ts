import { useReservationControllers } from "@src/controllers/reservations"
import { useUserControllers } from "@src/controllers/users"
import { endpoint } from "@src/endpoint"
import { Request, Response, Router } from "express"

export const router = Router()

router.get(endpoint.ping, async (_req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "I am alive!",
  })
})

useUserControllers(router)
useReservationControllers(router)
