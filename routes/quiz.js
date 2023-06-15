const express = require("express");
const router = express.Router();
const quiz = require("../controller/quiz");
const rateLimiter = require("../controller/apiRatelimiter");

router.get("/quizzes/:id/result", rateLimiter.getResult, quiz.getResult);
router.get("/quizzes/active", rateLimiter.getActiveQuiz, quiz.getActiveQuiz);
router.get("/quizzes/all", rateLimiter.getAll, quiz.getAll);
router.post("/quizzes", rateLimiter.createQuiz, quiz.createQuiz);

module.exports = router;
