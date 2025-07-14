const express = require('express');
const bookController = require('../controllers/bookController');
const authController = require('../middleware/auth');
const adminController = require('../middleware/isAdmin');
const router = express.Router();

router.post('/add',authController.authenticate,adminController.isAdmin,bookController.addBook);


router.get('/getbooks',authController.authenticate, bookController.getbooks);
router.delete('/notadd/:bookId',authController.authenticate,adminController.isAdmin,bookController.notaddBook);

module.exports = router;