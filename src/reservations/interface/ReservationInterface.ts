export interface Reservation {
  type: "reservation"
  id: string
  bookingInfo: BookingInfo
}
export interface BookingInfo {
  bookedBy: string
  entity: string
  starttime: string
  endtime: string
}