import { NewReservation, Reservation } from "@src/reservations/interface/ReservationInterface";
import { getDatabase } from "@src/storage/db";
import { v4 as uuidv4 } from "uuid";

interface ReservationFilter {
  timestamp?: string
}
const collection = "kb_reservations"
export const reservationService = {

  create: async (creation: NewReservation): Promise<Reservation> => {
    try {
      const db = await getDatabase()
      if (!db) {
        throw new Error("Unable to connect to database")
      }
      const reservations = db.collection(collection)
      const newReservation: Reservation = {
        _id: uuidv4(),
        type: "reservation",
        bookedBy: creation.bookedBy,
        starttime: creation.starttime,
        endtime: creation.endtime,
        entity: creation.entity,
      }
      await reservations.insertOne(newReservation)
      return newReservation
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  update: (reservation: Reservation): Reservation | undefined => {
    throw new Error("Method not implemented.")
  },

  getById: (id: string): Reservation | undefined => {
    throw new Error("Method not implemented.")
  },

  list: (filters: ReservationFilter): Reservation[] => {
    console.log(filters)
    throw new Error("Method not implemented.")
  },

  listByUserId: (userId: string): Reservation[] => {
    throw new Error("Method not implemented.")
  },
}
