const { User } = require('../models');

const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find({})
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
    .catch (err => {
      console.log(err);
      res.sendStatus(400).json(err);
    });
  },

  //getUserById
  getUserById(req, res) {
    User.findOne({ _id: params.id})
    .populate({
      path: 'thought',
      select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },

  //createUser
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  //updateUser
  updateUser({ params }, res) {
    User.findOneAndUpdate({ _id: params.id }, {new: true, runValidators: true})
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  //deleteUser
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
  }
};

  //removeOneUsersThoughtsWhenUserIsDeleted

module.exports = userController;