const express = require('express');
const router = express.Router()
const {create,destroy} = require('../../controllers/apis/moviesController');



//apis/movies

router.post('/', create),
router.delete('/:id', destroy) 

module.exports = router