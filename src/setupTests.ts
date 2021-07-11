/**
 * Use jest.unmock() default mocks
 */
jest.mock("uuid", () => {
  let index = 1
  return {
    v4: () => {
      index++
      return `uuid-${index - 1}`
    },
  }
})
