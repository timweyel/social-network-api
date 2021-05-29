const router = require('express').Router();

const { 
  getAllThoughts,
  getThoughtById,
  createThought, 
  deleteThought 
} = require('../../controllers/thought-controller');


// /api/thoughts/<userId>
router.route('/:userId')
  .post(createThought);

// /api/thoughts
router.route('/')
  .get(getAllThoughts)



// /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId')
  .delete(deleteThought)
  .post(getThoughtById);;

module.exports= router;