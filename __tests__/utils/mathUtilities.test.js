const { isCorrectAnswer, getQuestion } = require("../../utils/mathUtilities");

describe("Tests for getQuestion", () => {
  test("Tests that getQuestion returns a math question", () => {
    expect(getQuestion()).toBeTruthy();
  });
});

describe("Tests for isCorrectAnswer", () => {});
