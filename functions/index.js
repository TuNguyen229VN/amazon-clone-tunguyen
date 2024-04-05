const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51P1mNRFhreKVvoIjuz2v0Dp1lPO0Ajp5IdjJ98XeEAZaBB5dkEcg4qT3TUQsPvhnUAdngL2rXqDp5qHpGXkwI3ww00orGNqleg");

// API

// API config
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  //   console.log("Payment Request Recieved");
  const paymentIntent = await stripe.paymentIntent.create({
    amount: total,
    currency: "usd",
  });

  response.status(201).send({clientSecret: paymentIntent.client_secret});
});

// Listen command
exports.api = functions.https.onRequest(app);
