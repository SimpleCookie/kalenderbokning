import { CreateReservation, Reservation } from "@api/reservations/interface/ReservationInterface";
import { getDatabase } from "@api/storage/db";
import { v4 as uuidv4 } from "uuid";

interface ReservationFilters {
  date?: string
}

export const reservationService = {

  create: async (creation: CreateReservation): Promise<Reservation> => {
    try {
      const db = await getDatabase()
      if (db) {
        const reservations = db.collection('reservations')
        const newReservation: Reservation = {
          id: uuidv4(),
          type: "reservation",
          bookedBy: creation.bookedBy,
          starttime: creation.starttime,
          endtime: creation.endtime,
          entity: creation.entity,
        }
        await reservations.insertOne(newReservation)
        return newReservation
      }
      throw new Error("Unable to connect to database")
    } catch (error) {
      console.error("Unable to insert new reservationDto in database")
      throw error
    }
  },

  update: (reservation: Reservation): Reservation | undefined => {
    throw new Error("Method not implemented.")
  },

  getById: (id: string): Reservation | undefined => {
    throw new Error("Method not implemented.")
  },

  list: (filters: ReservationFilters): Reservation[] => {
    console.log(filters)
    throw new Error("Method not implemented.")
  },

  listByUserId: (userId: string): Reservation[] => {
    throw new Error("Method not implemented.")
  },
}