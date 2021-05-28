const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller');

// /api/users
router.route('/')
  .get(getAllUsers)
  .post(createUser)
  ;

// /api/users/:id  
router.route('/:id')
  .get(getUserById)
  .post(updateUser)
  .delete(deleteUser);

module.exports = router;