const express = require('express');
const router = express.Router()
const {create,destroy, list,detail, update} = require('../../controllers/apis/moviesController');




//apis/movies
router.get('/',list),
router.get('/:id', detail)
router.post('/', create),
router.put('/:id',update)
router.delete('/:id', destroy) 

module.exports = router