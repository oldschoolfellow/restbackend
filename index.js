let express = require('express')
let app = express();
var port = process.env.PORT || 8080;

//import body parser
let bodyParser = require('body-parser');
//import mongoose
let mongoose = require('mongoose');
//configure bodyparser to hande the post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Import routes
let apiRoutes = require("./routes")
//Use API routes in the App
app.use('/v1', apiRoutes)

//connect to mongoose
const dbPath = 'mongodb://localhost/firstrest';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('db connected');
}, error => {
    console.log(error, 'error');
})

// Welcome message
app.get('/', (req, res) => res.send('Welcome to Express'));
// Launch app to the specified port
app.listen(port, function() {
    console.log("Running backend on Port "+ port);
})