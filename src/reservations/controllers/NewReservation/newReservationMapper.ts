import { NewReservation, Reservation } from "@src/reservations/interface/ReservationInterface";
import { NewReservationDto as NewReservationDto, ReservationDto } from "@src/reservations/interface/ReservationInterfaceDto";

export const newReservationMapper = {
  toDto: (reservation: Reservation): ReservationDto => {
    try {
      return ({
        type: "reservation",
        id: reservation._id,
        entity: reservation.entity,
        bookedBy: reservation.bookedBy,
        starttime: reservation.starttime,
        endtime: reservation.endtime,
      });
    } catch (error) {
      console.error("Fail to map reservation to dto", reservation)
      throw error
    }
  },
  fromCreationDto: (reservation: NewReservationDto): NewReservation => {
    try {
      const {
        entity,
        bookedBy,
        starttime,
        endtime,
      } = reservation

      if (!entity || !bookedBy || !starttime || !endtime) {
        throw new Error("Invalid newReservationDto")
      }
      return ({
        type: "new_reservation",
        entity,
        bookedBy,
        starttime,
        endtime,
      });
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}