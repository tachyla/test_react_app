const express = require("express");
// returns router object, then Rename app -> router
const router = express.Router();

const recipies = [
    {id: 1, name: "Sweet Potatoes", ingredients: "5 sweet potatoes, 2 sticks butter, 3 cups sugar, 1 tsp cinnamon"},
    {id: 2, name: "Peach Cobbler", ingredients: "1 can peaches in heavy syrup, 1 roll pie crust, 1 cup sugar"},
    {id: 3, name: "Fried Chicken", ingredients: "1lb chicken wings, 1 pkg Lefties seasoning, 2 tbs garlic powder, 1 tbs pepper"},
    {id: 4, name: "Pari's chicken dip", ingredients: "1lb chicken, franks red hot sauce"}
];

router.get("/", (req, res) => {
    res.send(recipies);
});

router.get("/:id", (req, res) => {
    // search recipies arr using ID === to the req.params.id
    const recipie = recipies.find(recipie => recipie.id === parseInt(req.params.id));
   
    // if no id exists return error
    if(!recipie) res.status(404).send("The recipie with the given ID was not found");
    
    // include schema & validate input
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .required()
    });

    const result = schema.validate(req.body);
    // if result is invalid return 400 error bad request
    if(!result) res.status(400).send(result.error.details[0].message);
    console.log(result); //this result returns an object that can only have a "value": or "error":

    // if recipies.id exists return recipie object
    res.send(recipie);
});

router.post("/", (req, res) => {
    if(!req.body.name || req.body.name.length < 3) {
        res.status(400).send("Name must be minimum 3 characters");
    
        const schema = Joi.object({
            name: Joi.string()
            .min(3)
            .required()
        });
        
        const result = schema.validate(req.body);
        if(!result) res.status(400).send(result.error.details[0].message);
    }

    const recipie = {
        id: recipies.length + 1,
        name: req.body.name
    };

    recipies.push(recipie);
    res.send(recipie);
});

router.put("/:id", (req, res) => {
// search recipies using ID === req.params.id
    const index = recipies.find(recipie => recipie.id === parseInt(req.params.id));
    if(!recipie) res.status(404).send("The recipie with the given ID was not found");
    
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .required()
    });

    const result = schema.validate(req.body);

    if(!result) res.status(400).send(result.error.details[0].message);

    // update recipie object
    recipie.name = req.body.name;
    // return the updated course 
    res.send(recipie);
});

router.delete("/:id", (req, res) =>{
    const index = recipies.indexOf(recipie => recipie.vendor_id === parseInt(req.params.id));
    console.log(index);
    recipies.splice(index, 1);
    res.send(recipies); 
});

// export the module so it can be loaded in server.js 
module.exports = router;