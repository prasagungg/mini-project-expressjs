const express = require("express");
const Datastore = require("nedb");

const app = express();

//use static file
app.use(express.static("public"));

//use a static jason
app.use(express.json({ limit: "1mb" }));

//init database
const database = new Datastore("database.db");
database.loadDatabase();
//route get
app.get("/api", (request, response) => {
  database.find({}, (error, data) => {
    if (error) {
      response.end();
      return;
    }
    response.json(data);
  });
});
//route post
app.post("/api", (request, response) => {
  console.log("I got a request !!");
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});
//listen port
app.listen(3000, () => {
  console.log("listen on 3000");
});
