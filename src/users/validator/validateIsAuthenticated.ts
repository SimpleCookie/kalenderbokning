import { NextFunction, Request, Response } from "express"
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const validateIsAuthenticated = (req: Request, res: Response, next: NextFunction) => {

  const validate = (req: Request) => req.cookies["_token"]
  if (!validate(req)) {
    res.status(StatusCodes.FORBIDDEN).send({ error: ReasonPhrases.FORBIDDEN });
    return
  }
  next();
}

