export interface CreateRequestDto<T> {
  data: T
}
export interface UpdateRequestDto<T> {
  id: string
  data: T
}
export interface ResponseDto<T> {
  id: string
  type: "user" | "reservation"
  data: T
}
export interface ReservationDto {
  bookedBy: string
  entity: string
  starttime: string
  endtime: string
}