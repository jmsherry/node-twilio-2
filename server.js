require("dotenv").config();

const express = require("express");

const {
  PORT = 3000,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_TRIAL_NUMBER, // U.S Sender number
} = process.env;

const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.post("/api/v1/send-sms", (req, res) => {
  console.log(req.body);

  const { phone, message } = req.body;

  (async () => {
    try {
      const response = await client.messages.create({
        body: message,
        from: TWILIO_TRIAL_NUMBER,
        to: phone,
      });
      res.status(201).json(response.sid);
    } catch (err) {
      console.log("err", err);
      res.status(500).send(err);
    }
  })();
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
