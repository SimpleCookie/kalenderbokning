export interface Reservation {
  type: "reservation"
  id: string
  bookedBy: string
  entity: string
  starttime: string
  endtime: string
}
export interface CreateReservation {
  type: "create_reservation"
  bookedBy: string
  entity: string
  starttime: string
  endtime: string
}