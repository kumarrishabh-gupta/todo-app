const bodyParser = require("body-parser");
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const url = require("./credentials/mongo").url;
const Todo = require("./models/todo.models")

// Imports for Routes
const todoRoutes = require("./routes/todo.route");

const app = express();
const PORT = process.env.PORT || 3000


// Handle MongoDB Connection
mongoose
  .connect(url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(express.urlencoded({extended : true}))
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
// app.set("view engine", "ejs")

// Use Cors to avoid annoying CORS Errors
app.use(cors());


// Send basic info about the API
app.use("/api/info", (req, res, next) => {
    res.status(200).json({
      name: "TODO Api",
      version: "1.0",
      description: "RESTful API Designed in Node.js for TODO application.",
      methodsAllowed: "GET, POST, PUT, PATCH, DELETE",
      authType: "None",
      rootEndPoint: req.protocol + '://' + req.get('host') + '/api/v1',
      documentation: "https://github.com/kumarrishabh-gupta/todo"
    });
  });


app.listen(PORT, () => console.log(`Server is listing on the port : ${PORT}`));

  // Set up API Routes
app.use("/api/v1/todo", todoRoutes);

module.exports = app;

