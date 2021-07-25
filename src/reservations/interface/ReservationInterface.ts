export interface Reservation {
  type: "reservation"
  _id: string
  bookedBy: string
  entity: string
  starttime: string
  endtime: string
}
export interface NewReservation {
  type: "new_reservation"
  bookedBy: string
  entity: string
  starttime: string
  endtime: string
}

export interface ListReservationFilter {
  type: "list_reservation_timestamp"
  timestamp: string
}
