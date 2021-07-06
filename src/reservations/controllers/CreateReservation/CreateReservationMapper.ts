import { NewReservation, Reservation } from "@api/reservations/interface/ReservationInterface";
import { CreateReservationDto as NewReservationDto, ReservationDto } from "@api/reservations/interface/ReservationInterfaceDto";

export const createReservationMapper = {
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
      return ({
        type: "new_reservation",
        entity: reservation.entity,
        bookedBy: reservation.bookedBy,
        starttime: reservation.starttime,
        endtime: reservation.endtime,
      });
    } catch (error) {
      console.error("Fail to map reservation from dto", reservation)
      throw error
    }
  }
}