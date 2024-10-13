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
  const question = getQuestion(); // Generate a question
  res.render("quiz", { question, resultMessage: null });
});

app.get("/leaderboards", (req, res) => {
  res.render("leaderboards");
});

app.get("/completed", (req, res) => {
  res.render("completed");
});

// Handles quiz submissions.
app.post("/quiz", (req, res) => {
  const { question, answer } = req.body;
  console.log(`Question: ${question}, Answer: ${answer}`);

  const correctAnswer = getAnswer(question);

  const providedAnswer = Number(answer);

  let resultMessage;

  if (correctAnswer === providedAnswer) {
    resultMessage = "Correct!";
  } else {
    resultMessage = `Incorrect! The correct answer was ${correctAnswer}.`;
  }

  const newQuestion = getQuestion();

  res.render("quiz", {
    resultMessage,
    question: newQuestion,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
