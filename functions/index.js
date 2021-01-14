const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { response, request } = require("express");
const stripe = require("stripe")(
  "sk_test_51I6A3ZF2utBBtSGKBdpmARunRPn8VAsJnunZLGn1nVyQGtFCqZFwWweMvVXZDbtvCeowFzZiP1kCtjU8PkqTeaHr00WtzOjh3f"
);

// API SETUP WITH FIREBASE
let paymentIntent;

// -- APP CONFIG --
const app = express();

// -- MIDDLEWARES --
app.use(cors({ origin: true }));
app.use(express.json());

// -- API ROTES --
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Received BOOM!!! for This Amt >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //in subunits of currency
    currency: "usd",
  });

  // OK - Created response 201
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// -- LISTEN COMMANDS --
exports.api = functions.https.onRequest(app);

// end point
// http://localhost:5001/react-ecom-template/us-central1/api

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
