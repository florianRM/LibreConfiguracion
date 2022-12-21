const express = require('express');
const { uploadFile } = require('../controllers/upload');
const router = express.Router();

router.post('/', uploadFile);

module.exports = router;