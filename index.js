const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const {
  getQuestion,
  getAnswer,
  mathQuestion,
} = require("./utils/mathUtilities");
let leaderboard = [];
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
  res.render("leaderboards", { top10: leaderboard.slice(0, 10) }); // Pass the top 10 streaks
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
      streak: req.session.streak, // Pass the streak to the view
    });
  } else {
    const currentStreak = req.session.streak;
    req.session.streak = 0; // Reset the streak on incorrect answer
    resultMessage = `Incorrect! The correct answer was ${correctAnswer}.`;

    // Store the streak and date in the leaderboard
    leaderboard.push({
      streak: currentStreak,
      date: new Date().toLocaleString(),
    });

    // Sort the leaderboard by streak in descending order and slice the top 10
    leaderboard.sort((a, b) => b.streak - a.streak);
    const top10 = leaderboard.slice(0, 10);

    // Redirect to the completed page with the current streak
    res.render("completed", {
      streak: currentStreak, // Pass the current streak to the completed page
      top10, // Pass the top 10 streaks to the completed page
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
