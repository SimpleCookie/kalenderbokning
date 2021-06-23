import { Reservation } from "@api/reservations/interface/ReservationInterface";
import { ReservationRequestDto } from "@api/reservations/interface/ReservationInterfaceDto";
import { getDatabase } from "@api/storage/db";

interface ReservationFilters {
  date?: string
}

export class ReservationService {

  static async create(reservationDto: ReservationRequestDto): Promise<Reservation> {
    try {
      const bookingInfo = reservationDto.bookingInfo
      const type = 'reservation'
      const db = await getDatabase()

      const reservations = db.collection('reservations')
      const reservation = await reservations.insertOne({
        type,
        bookingInfo
      })
      return {
        id: reservation.insertedId,
        type,
        bookingInfo
      }
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