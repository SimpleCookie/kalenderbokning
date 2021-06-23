import { createReservationMapper } from "@api/reservations/controllers/CreateReservation/createReservationMapper";
import { Reservation } from "@api/reservations/interface/ReservationInterface";
import { ReservationRequestDto } from "@api/reservations/interface/ReservationInterfaceDto";
import { getDatabase } from "@api/storage/db";

interface ReservationFilters {
  date?: string
}

export class ReservationService {

  static async create(reservationDto: ReservationRequestDto): Reservation {
    try {

      const reservation = createReservationMapper.fromDto(reservationDto)
      const db = await getDatabase()

      const reservations = db.collection('reservations')
      await reservations.insertOne(reservation)
      return reservation
    } catch (error) {
      console.error("Unable to insert new reservationDto in database")
      throw error
    }
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