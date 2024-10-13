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

function getAnswer(question) {
  let answer;

  switch (question) {
    case "3+4":
      answer = 7;
      break;
    case "15-8":
      answer = 7;
      break;
    case "5x2":
      answer = 10;
      break;
    case "18÷3":
      answer = 6;
      break;
    case "12+21":
      answer = 33;
      break;
    case "34-12":
      answer = 22;
      break;
    case "12x4":
      answer = 48;
      break;
    case "125÷5":
      answer = 25;
      break;
    case "126+53":
      answer = 179;
      break;
    case "56-42":
      answer = 14;
      break;
    case "11x14":
      answer = 154;
      break;
    case "180÷9":
      answer = 20;
      break;
    case "237+526":
      answer = 763;
      break;
    case "642-326":
      answer = 316;
      break;
    case "13x20":
      answer = 260;
      break;
    case "154÷14":
      answer = 11;
      break;
    default:
      answer = "Question not found";
  }

  return answer;
}

// const selectedQuestion = mathQuestion[0]; // For example, "3+4"
// const answer = getAnswer(selectedQuestion);
// console.log(`The answer to "${selectedQuestion}" is ${answer}.`);

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
function isCorrectAnswer(question, providedAnswer) {
  const correctAnswer = getAnswer(question);
  return correctAnswer === providedAnswer;
}

module.exports = {
  getQuestion,
  isCorrectAnswer,
  getAnswer,
  mathQuestion,
};
