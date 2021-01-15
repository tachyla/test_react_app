const express = require("express");
const app = express();

// express provides the following methods 
// how to use express -> http://expressjs.com/en/4x/api.html
// app.get()
// app.put()
// app.post()
// app.delete()

// route that defines what displays for root route
app.get("/", (req,res) => {
    res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
    res.send([1,2,3]);
});

// PORT 
const port = process.env.PORT || 1913;
app.listen(port, () => console.log(`Listening on port ${port}`));