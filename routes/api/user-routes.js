const router = require('express').Router();

const {
  getAllUsers
} = require('../../controllers/user-controller');

// /api/users
router
  .route('/')
  .get(getAllUsers);

module.exports = router;