const router = require('express').Router();

const { 
  getAllThoughts,
  getThoughtById,
  createThought, 
  deleteThought,
  addReaction,
  removeReaction,
  updateThought
} = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router.route('/:userId')
  .post(createThought);

// /api/thoughts
router.route('/')
  .get(getAllThoughts);

router.route('/:id')
  .get(getThoughtById)
  .put(updateThought);

// /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId')
  .delete(deleteThought);

router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

router.route('/:thoughtId/reactions/')
  .post(addReaction);


module.exports= router;