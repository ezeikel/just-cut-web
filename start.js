const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// Load mongodb collections on start up
require('./models/Shop');

// scrambles a connection string, showing only relevant info
const scramble = (connection_string) => connection_string.replace(/:\/\/.*?\//, "://***/");

// Start our app & notify console of server boot and current settings
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
    console.log(`Just Cutt API ✂️`);
    console.log(`Express running → PORT ${server.address().port}`);
    console.log(`Environment → ${app.get('env')}`);
    console.log(`DATABASE → ${scramble(process.env.DATABASE)}`);
});
