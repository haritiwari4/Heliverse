const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const apicache = require("apicache");
const mongoose = require("mongoose");
const quizRoute = require("./routes/quiz");
const Quiz = require("./models/quiz");
const cron = require("node-cron");



app.use(bodyParser.json());
cron.schedule("* * * * *", async () => {
  const quizzes = await Quiz.find();

  quizzes.forEach(async (obj) => {
    if (obj.startDate.getTime() > new Date().getTime()) {
      obj.status = "inactive";
    } else if (obj.endDate.getTime() > new Date().getTime()) {
      obj.status = "active";
    } else {
      obj.status = "finished";
    }
    await obj.save();
  });
});

app.use(morgan("dev"));

let cache = apicache.middleware;

app.use(cache("5 minutes"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(quizRoute);
mongoose.connect(
  `${process.env.MONGO_URL}`
);
app.use((error, req, res, next) => {
  res.json({ error: error, message: error.message });
});
app.listen(process.env.PORT || 8080);

