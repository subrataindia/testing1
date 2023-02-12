import sum from "./sum";

describe("sum of 2 and 4 should be 6", () => {
  it("sums up two values", () => {
    expect(sum(2, 4)).toBe(6);
  });
});
