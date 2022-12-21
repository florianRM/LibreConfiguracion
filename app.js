const config = require('./config.js');
const express = require('express');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const app = express();

// DATABASE CONNECTION
async function connectAtlas(){
    await dbConnection()
}
connectAtlas()

// MIDDLEWARE
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// ROUTES
app.use('/beers', require('./routes/beers'));
app.use('/pubs', require('./routes/pubs'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/upload', require('./routes/upload'));

// SERVER LISTENER
app.listen(config.PORT, config.HOST, function () {
  console.log(`App listening on http://${config.HOST}:${config.PORT}`);
});