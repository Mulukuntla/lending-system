const express = require('express');
const borrowController = require('../controllers/borrowController');
const authController = require('../middleware/auth');
const router = express.Router();

router.post('/borrow',authController.authenticate,borrowController.borrowBook);


router.post('/return',authController.authenticate,borrowController.returnBook);

module.exports = router;