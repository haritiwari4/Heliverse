const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("User", userschema);
