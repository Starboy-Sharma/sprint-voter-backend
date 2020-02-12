import express from "express";

const port = process.env.PORT || 8000;

const app = express();
app.disable("x-powered-by");

app.get("/status", (req, res) => {
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
