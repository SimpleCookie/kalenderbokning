import { collectionNames } from "@src/collectionNames";
import { Reservation } from "@src/reservations/interface/ReservationInterface";
import { ListReservationFilterDto } from "@src/reservations/interface/ReservationInterfaceDto";
import { getDatabase } from "@src/storage/db";

export const listReservationService = {

  list: async ({ timestamp }: ListReservationFilterDto): Promise<Reservation[]> => {
    try {
      const db = await getDatabase()
      if (!db) {
        throw new Error("Unable to connect to database")
      }
      const collection = db.collection<Reservation>(collectionNames.reservation)

      const reservations = await collection.find({ timestamp })
      return reservations.toArray()
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}