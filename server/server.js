const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "TEST-5550349735454527-123016-e1d2572d2f6daa56b0bab33fa76b3d1e-223732740",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("../../client"));
app.use(cors());

app.post("/create_preference", (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: "http://localhost:8080/feedback",
      failure: "http://localhost:8080/feedback",
      pending: "http://localhost:8080/feedback",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/feedback", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

app.listen(8080, () => {
  console.log("The server is now running on Port 8080");
});
