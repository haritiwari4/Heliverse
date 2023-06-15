const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizschema = new Schema({
  _id: {
    type: Number,
  },
  questionText: {
    type: String,
  },
  options: {
    type: Array,
  },
  answerIndex: {
    type: Number,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Quiz", quizschema);
