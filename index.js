const express = require("express");
const bodyParser = require("body-parser");
const {
  getQuestion,
  getAnswer,
  mathQuestion,
} = require("./utils/mathUtilities"); // Import getAnswer
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/quiz", (req, res) => {
  res.render("quiz", { question: getQuestion() });
});

app.get("/leaderboards", (req, res) => {
  res.render("leaderboards");
});

app.get("/completed", (req, res) => {
  res.render("completed");
});

// Handles quiz submissions.
app.post("/quiz", (req, res) => {
  const { question, answer } = req.body; // Here, you need to ensure that 'question' is sent in the form.
  console.log(`Question: ${question}, Answer: ${answer}`);

  const correctAnswer = getAnswer(question); // This should work now
  let resultMessage;

  if (correctAnswer === answer) {
    resultMessage = "Correct!";
  } else {
    resultMessage = `Incorrect! The correct answer was ${correctAnswer}.`;
  }

  // Get a new random question from mathQuestion
  const newQuestion =
    mathQuestion[Math.floor(Math.random() * mathQuestion.length)];

  res.render("quiz", {
    resultMessage,
    question: newQuestion, // Ensure you're passing the new question here
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
