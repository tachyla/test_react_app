// const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const recipies = [
    {id: 1, name: "Sweet Potatoes", ingredients: "5 sweet potatoes, 2 sticks butter, 3 cups sugar, 1 tsp cinnamon"},
    {id: 2, name: "Peach Cobbler", ingredients: "1 can peaches in heavy syrup, 1 roll pie crust, 1 cup sugar"},
    {id: 3, name: "Fried Chicken", ingredients: "1lb chicken wings, 1 pkg Lefties seasoning, 2 tbs garlic powder, 1 tbs pepper"}
]

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.get("/api/recipies", (req, res) => {
    res.send(recipies);
});

app.get("/api/recipies/:id", (req, res) => {
    // search recipies arr using ID === to the req.params.id
    const recipie = recipies.find(recipie => recipie.id === parseInt(req.params.id));
   
    // if no id exists return error
    if(!recipie) res.status(404).send("The recipie with the given ID was not found");
    
    // validate input
    // if recipies.id exists return recipie object
    res.send(recipie);
});

app.post("/api/recipies", (req, res) => {
    if(!req.body.name || req.body.name.length < 3) {
        res.status(400).send("Name must be minimum 3 characters");
    
    const recipie = {
        id: recipies.length + 1,
        name: req.body.name
    };
     
    recipies.push(recipie);
    res.send(recipie);
    }
});

app.put("/api/recipies/:id", (req, res) => {
// search recipies using ID === req.params.id
    const index = recipies.indexOf(recipie => recipie.id === parseInt(req.params.id));
    // if (!recipie) retrun 404 error
    if(!recipie) res.status(404).send("The recipie with the given ID was not found");
    
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .required()
    });

    const result = schema.validate(req.body);
    console.log(result);

    // if inVALID input, send 400 error
    if(!req.body.name || req.body.name.length < 3) {
        res.status(400).send("The recipie name must have minimum 3 characters")};
    // update recipie object
    // return the updated course 
    recipie.name = req.body.name;
    res.send(recipie);
});

// PORT 
const port = process.env.PORT || 1913;
app.listen(port, () => console.log(`Listening on port ${port}`));