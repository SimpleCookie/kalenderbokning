import { NewReservation, Reservation } from "@src/interfaces/reservations/ReservationInterface";
import { NewReservationDto, ReservationDto } from "@src/interfaces/reservations/ReservationInterfaceDto";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

export const reservationBuilder = {
  dto: {
    newReservation: (config?: ReservationConfig): NewReservationDto => ({
      bookedBy: config?.bookedBy ?? "Johnns",
      entity: config?.entity ?? "Skola",
      starttime: config?.starttime ?? dayjs("2021-06-06").toISOString(),
      endtime: config?.endtime ?? dayjs("2021-06-07").toISOString(),
    }),
    reservation: (config?: ReservationConfig): ReservationDto => ({
      type: "reservation",
      id: uuidv4(),
      bookedBy: config?.bookedBy ?? "Johnns",
      entity: config?.entity ?? "Skola",
      starttime: config?.starttime ?? dayjs("2021-06-06").toISOString(),
      endtime: config?.endtime ?? dayjs("2021-06-07").toISOString(),
    }),
  },
  int: {
    newReservation: (config?: ReservationConfig): NewReservation => ({
      type: "new_reservation",
      bookedBy: config?.bookedBy ?? "Johnns",
      entity: config?.entity ?? "Skola",
      starttime: config?.starttime ?? dayjs("2021-06-06").toISOString(),
      endtime: config?.endtime ?? dayjs("2021-06-07").toISOString(),
    }),
    reservation: (config?: ReservationConfig): Reservation => ({
      type: "reservation",
      _id: uuidv4(),
      bookedBy: config?.bookedBy ?? "Johnns",
      entity: config?.entity ?? "Skola",
      starttime: config?.starttime ?? dayjs("2021-06-06").toISOString(),
      endtime: config?.endtime ?? dayjs("2021-06-07").toISOString(),
    }),
  }
}

interface ReservationConfig {
  id?: string
  bookedBy?: string
  entity?: string
  starttime?: string
  endtime?: string
}
