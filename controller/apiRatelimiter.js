const { rateLimit } = require("express-rate-limit");

exports.createQuiz = rateLimit({
  windowMs: 3 * 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
});

exports.getActiveQuiz = rateLimit({
  windowMs: 3 * 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
});

exports.getResult = rateLimit({
  windowMs: 3 * 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
});

exports.getAll = rateLimit({
  windowMs: 3 * 60 * 60 * 1000,
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
});
