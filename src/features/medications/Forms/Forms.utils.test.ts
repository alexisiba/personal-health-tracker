import { combineDateAndTime } from "./Forms.utils";

describe("combineDateAndTime", () => {
  it("applies the time's hours and minutes onto the date", () => {
    const date = new Date(2024, 5, 15);
    const time = new Date(2000, 0, 1, 14, 30);

    expect(combineDateAndTime(date, time)).toEqual(new Date(2024, 5, 15, 14, 30));
  });

  it("does not mutate either input", () => {
    const date = new Date(2024, 5, 15);
    const time = new Date(2000, 0, 1, 14, 30);

    combineDateAndTime(date, time);

    expect(date).toEqual(new Date(2024, 5, 15));
    expect(time).toEqual(new Date(2000, 0, 1, 14, 30));
  });
});
