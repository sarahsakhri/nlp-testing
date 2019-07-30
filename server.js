'use strict';

require('dotenv').config()
const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;

const express = require('express');
const app = express();

// var mongojs = require("mongojs");
const mongoose = require("mongoose");

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/goaldb";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

// Require all models
const db = require("./model/Goal");


app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

// --------
const apiai = require('apiai')(APIAI_TOKEN);

// Web UI
app.get('/', (req, res) => {
  res.sendFile('index.html');
});


app.post("/submit", function (req, res) {
  var goal = req.body.comment;
  var duration = "";
  var startTime = "";

  console.log("********"
    , req.body);

  console.log(goal);

  let apiaiReq = apiai.textRequest(goal, {
    sessionId: APIAI_SESSION_ID
  });

  // console.log(apiaiReq);

  apiaiReq.on('response', (response) => {
    const aiText = response.result;

    console.log(aiText);

    console.log("Goal:" + aiText.parameters.goal);
    console.log("Duration: " + aiText.parameters.duration.amount + aiText.parameters.duration.unit);
    console.log("Start Date: " + aiText.parameters.startTime);

    duration = aiText.parameters.duration.amount + aiText.parameters.duration.unit;
    startTime = aiText.parameters.startTime;

    console.log(aiText.fulfillment);
    let json = response.result.parameters
    console.log("json" + json);

    db.create({
      goal: goal,
      correct: 0,
      duration: duration,
      startTime: startTime
    },
      function (err, inserted) {
        if (err) {
          // Log the error if one is encountered during the query
          console.log(err);
        } else {
          // Otherwise, log the inserted data
          // console.log(
          //   "ID-------" + inserted);
          let json = response.result.parameters
          json.id = inserted._id
          console.log(
            "ID-------" + json.id);
          res.json(response.result.parameters)
        }
      }
    )
  });

  apiaiReq.on('error', error => console.log(error));
  apiaiReq.end();

})