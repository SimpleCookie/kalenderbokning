export interface NewReservationDto {
  bookedBy?: string
  entity?: string
  starttime?: string
  endtime?: string
}

export interface ReservationDto {
  type: "reservation"
  id: string
  bookedBy: string
  entity: string
  starttime: string
  endtime: string
}

export interface ListReservationFilterDto {
  type: "list_reservation_timestamp"
  timestamp: string
}
