import { collectionNames } from "@src/collectionNames";
import { NewReservation, Reservation } from "@src/reservations/interface/ReservationInterface";
import { getDatabase } from "@src/storage/db";
import { v4 as uuidv4 } from "uuid";

export const newReservationService = {

  create: async (creation: NewReservation): Promise<Reservation> => {
    try {
      const db = await getDatabase()
      if (!db) {
        throw new Error("Unable to connect to database")
      }
      const reservations = db.collection(collectionNames.reservation)
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
}
