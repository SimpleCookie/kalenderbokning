import { Reservation } from "../interface/ReservationInterface";
import { ReservationDto } from "../interface/ReservationInterfaceDto";

export const reservationMapper = {
  toDto: (reservation: Reservation): ReservationDto => {
    try {
      return ({
        type: "reservation",
        id: reservation.id,
        bookingInfo: {
          entity: reservation.bookingInfo.entity,
          bookedBy: reservation.bookingInfo.bookedBy,
          starttime: reservation.bookingInfo.starttime,
          endtime: reservation.bookingInfo.endtime,
        }
      });
    } catch (error) {
      console.error("Fail to map reservation to dto", reservation)
      throw error
    }
  },
  fromDto: (reservation: ReservationDto): Reservation => {
    try {
      return ({
        type: "reservation",
        id: reservation.id,
        bookingInfo: {
          entity: reservation.bookingInfo.entity,
          bookedBy: reservation.bookingInfo.bookedBy,
          starttime: reservation.bookingInfo.starttime,
          endtime: reservation.bookingInfo.endtime,
        }
      });
    } catch (error) {
      console.error("Fail to map reservation from dto", reservation)
      throw error
    }
  }
}