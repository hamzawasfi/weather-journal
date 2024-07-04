// Setup empty JS object to act as endpoint for all routes
ProjectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 8000;

const server = app.listen(port, () => {
    console.log(`server is running on localhost: ${port}`)
});

// Callback to debug

// Initialize all route with a callback function
const data = [];

app.get('/all', (req, res) => {
    res.send(data);
});

app.post('/add', (req, res) => {
    data.push(req.body);
    console.log(data);
});


// Callback function to complete GET '/all'

// Post Route
  