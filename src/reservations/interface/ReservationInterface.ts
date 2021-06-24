export interface Reservation {
  type: "reservation"
  id: string
  bookedBy: string
  entity: string
  starttime: string
  endtime: string
}