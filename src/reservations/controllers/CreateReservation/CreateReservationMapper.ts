import { CreateReservation, Reservation } from "@api/reservations/interface/ReservationInterface";
import { CreateReservationDto, ReservationDto } from "@api/reservations/interface/ReservationInterfaceDto";

export const createReservationMapper = {
  toDto: (reservation: Reservation): ReservationDto => {
    try {
      return ({
        type: "reservation",
        id: reservation.id,
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
  fromCreationDto: (reservation: CreateReservationDto): CreateReservation => {
    try {
      return ({
        type: "create_reservation",
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