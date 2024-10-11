const mathQuestion = [
  "3+4",
  "15-8",
  "5x2",
  "18÷3",
  "12+21",
  "34-12",
  "12x4",
  "125÷5",
  "126+53",
  "56-42",
  "11x14",
  "180÷9",
  "237+526",
  "642-326",
  "13x20",
  "154÷14",
];
/**
 * Gets a random multiplication, division, subtraction or addition question
 *
 * @returns {string} The randomly generated math question
 */
function getQuestion() {
  const randomIndex = Math.floor(Math.random() * mathQuestion.length);
  return mathQuestion[randomIndex];
}

/**
 * Parses the provided question and gets whether or not the provided answer is correct
 *
 * @param {*} question The question being answered
 * @param {*} answer The potential answer
 * @returns {boolean} True if the answer was correct, false otherwise.
 */
function isCorrectAnswer(question, answer) {
  return false;
}

module.exports = {
  getQuestion,
  isCorrectAnswer,
};
