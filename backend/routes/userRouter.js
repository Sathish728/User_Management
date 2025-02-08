const express = require('express');
const router = express.Router();
const { uploadUsers,exportUsers } = require("../controller/userController");
const authMiddleware = require('../utils/userMiddleware');
const upload=require("../utils/uploadMiddleware")




router.post('/upload', upload.single('file'), uploadUsers);
router.get('/download', exportUsers);

module.exports = router;