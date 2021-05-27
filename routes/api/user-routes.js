const router = require('express').Router();

const {
  getAllUsers,
  getUserById
} = require('../../controllers/user-controller');

// /api/users
router
  .route('/')
  .get(getAllUsers)
  ;

// /api/users/:id  
router
  .route('/:id')
  .get(getUserById);

module.exports = router;