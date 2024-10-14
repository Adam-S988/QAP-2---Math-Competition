const {
  isCorrectAnswer,
  getQuestion,
  correctAnswer,
  providedAnswer,
} = require("../../utils/mathUtilities");

describe("Tests for getQuestion", () => {
  test("Tests that getQuestion returns a math question", () => {
    expect(getQuestion()).toBeTruthy();
  });
});

describe("Tests for isCorrectAnswer", () => {
  test("Tests that a correct answer was recieved.", () => {
    expect(correctAnswer === providedAnswer);
  });
});

describe("Tests for isIncorrectAnswer", () => {
  test("Tests that an incorrect answer was recieved.", () => {
    expect(correctAnswer !== providedAnswer);
  });
});
