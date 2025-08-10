const express = require('express');
const Book = require('./book.model');
const router = express.Router();
const { postABook, getAllBooks, getASingleBook, updateBook, deleteBook, getSpecificBooks } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');

//post a book
router.post('/create-book', verifyAdminToken, postABook);

//fetch all books
router.get('/', getAllBooks);

//search for specific books
router.get('/search', getSpecificBooks);

//fetch a single book
router.get('/:id', getASingleBook);

//update a book
router.put('/edit/:id',verifyAdminToken, updateBook);

//delete a book
router.delete('/:id',verifyAdminToken, deleteBook);


module.exports = router;