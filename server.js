const Joi = require("joi");
const recipies = require("./routes/recipies");
const MongoClient = require("mongodb").MongoClient;
const express = require("express");

const app = express();

app.use(express.json());
// this helps use DRY and remove route path from recipies
app.use("/api/recipies", recipies);

app.get("/", (req, res) => {
    res.send("Hello World");
})

// PORT 
const port = process.env.PORT || 1913;
app.listen(port, () => console.log(`Listening on port ${port}`));
