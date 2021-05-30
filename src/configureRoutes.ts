import { Request, Response, Router } from "express"
import { useUserControllers } from "./users"
import { useReservationControllers } from "./reservations"
import { endpoint } from "./endpoint"

export const configureRoutes = (router: Router) => {
  router.get(endpoint.ping, async (_req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
      message: "I am alive!",
    })
  })

  useUserControllers(router)
  useReservationControllers(router)
}

