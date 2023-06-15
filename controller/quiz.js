const express = require("express");
const mongoose = require("mongoose");
const Quiz = require("../models/quiz");
exports.createQuiz = (req, res, next) => {
  const _id = req.body._id;
  const questionText = req.body.questionText;
  const options = req.body.options;
  const answerIndex = req.body.answerIndex;
  const status = req.body.status;
  const startDate = new Date();
  const endDate = new Date().setSeconds(new Date().getSeconds() + 6);

  const quiz = new Quiz({
    _id: _id,
    questionText: questionText,
    options: options,
    answerIndex: answerIndex,
    startDate: startDate,
    endDate: endDate,
    status: status,
  });
  quiz
    .save()
    .then(() => {
      res.status(200).json({ quiz: quiz });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 1100;
      error.message = "Duplicate key detected";
      return next(error);
    });
};

exports.getActiveQuiz = (req, res, next) => {
  const endProduct = [];
  Quiz.find()
    .then((result) => {
      result.map((obj) => {
        //console.log(result);
        if (obj.endDate.getTime() < new Date().getTime()) {
          endProduct.push(obj);
        }
      });
      if (!endProduct.length) {
        return res.status(200).json("Nothing Found");
      }
      res.status(200).json({ obj: endProduct });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 422;
      error.message = "Failed To f";
      return next(error);
    });
};
exports.getResult = (req, res, next) => {
  const quizId = req.params.id;
  Quiz.findOne({ _id: quizId })
    .then((result) => {
      const endTime = result.endDate.getTime();
      if (endTime + 300000 > new Date().getTime()) {
        return res
          .status(200)
          .json({ message: "result has not been declared yet" });
      }

      const index = result.answerIndex;
      const ans = result.options[index];
      res.status(200).json({ Result_is: ans });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 422;
      error.message = "Failed to fetch the Data";
      return next(error);
    });
};

exports.getAll = (req, res, next) => {
  Quiz.find()
    .then((result) => {
      res.status(200).json({ quizArray: result });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      error.message = "Failed to fetch the Data";
      return next(error);
    });
};
