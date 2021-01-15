const express = require("express");
const app = express();

const recipies = [
    {id: 1, name: "Sweet Potatoes", ingredients: "5 sweet potatoes, 2 sticks butter, 3 cups sugar, 1 tsp cinnamon"},
    {id: 2, name: "Peach Cobbler", ingredients: "1 can peaches heavy syrup, 1 roll pie crust, 1 cup sugat"},
    {id: 3, name: "Fried Chicken", ingredients: "1lb chicken wings, 1 pkg Lefties seasoning, 2 tbs garlic powder, 1 tbs pepper"}
]

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.get("/api/recipies", (req, res) => {
    res.send(recipies);
});

app.get("/api/recipies/:id", (req, res) => {
    // search recipies arr using ID === to the request.params.id
    const recipie = recipies.find(recipie => recipie.id === parseInt(req.params.id));
   
    // if no id exists return error
    if(!recipie) res.status(404).send("The recipie with the given ID was not found");
    
    // validate input
    // if recipies.id exists return recipie object
    res.send(recipie);



});

// PORT 
const port = process.env.PORT || 1913;
app.listen(port, () => console.log(`Listening on port ${port}`));