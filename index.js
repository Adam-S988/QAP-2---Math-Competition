const express = require("express");
const session = require("express-session");
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

app.use(
  session({
    secret: "your-secret-key", // Change this to a secure secret
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/quiz", (req, res) => {
  if (!req.session.streak) {
    req.session.streak = 0; // Initialize streak count
  }
  const question = getQuestion();
  res.render("quiz", {
    question,
    resultMessage: null,
    streak: req.session.streak,
  });
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
    req.session.streak += 1; // Increment the streak
    resultMessage = "Correct!";
    const newQuestion = getQuestion(); // Get a new question

    res.render("quiz", {
      resultMessage,
      question: newQuestion,
      streak: req.session.streak,
    });
  } else {
    const currentStreak = req.session.streak;
    req.session.streak = 0; // Reset the streak on incorrect answer
    resultMessage = `Incorrect! The correct answer was ${correctAnswer}.`;

    res.render("completed", {
      streak: currentStreak,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
