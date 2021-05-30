import { Reservation } from "../interface/ReservationInterface"
import { ReservationRequestDto } from "../interface/ReservationInterfaceDto"

interface ReservationFilters {
  date?: string
}

export class ReservationService {

  static create(reservation: ReservationRequestDto): Reservation {
    throw new Error("Method not implemented.")
  }

  static update(reservation: Reservation): Reservation | undefined {
    throw new Error("Method not implemented.")
  }

  static getById(id: string): Reservation | undefined {
    throw new Error("Method not implemented.")
  }

  static list(filters: ReservationFilters): Reservation[] {
    console.log(filters)
    throw new Error("Method not implemented.")
  }

  static listByUserId(userId: string): Reservation[] {
    throw new Error("Method not implemented.")
  }
}