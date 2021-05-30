export interface ReservationRequestDto {
  bookingInfo: BookingInfoDto
}
export interface ReservationDto {
  type: "reservation"
  id: string
  bookingInfo: BookingInfoDto
}
export interface BookingInfoDto {
  bookedBy: string
  entity: string
  starttime: string
  endtime: string
}