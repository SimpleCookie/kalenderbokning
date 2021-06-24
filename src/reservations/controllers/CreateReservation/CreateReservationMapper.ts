import { Reservation } from "@api/reservations/interface/ReservationInterface";
import { ReservationDto, ResponseDto } from "@api/reservations/interface/ReservationInterfaceDto";

export const createReservationMapper = {
  toDto: (reservation: Reservation): ResponseDto<ReservationDto> => {
    try {
      return ({
        type: "reservation",
        id: reservation.id,
        data: {
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