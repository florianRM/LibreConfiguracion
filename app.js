const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const app = express();

// DATABASE CONNECTION
async function connectAtlas(){
    await dbConnection()
}
connectAtlas()