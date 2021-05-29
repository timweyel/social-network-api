const { User } = require('../models');

const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find({})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbUserData => res.json(dbUserData))
    .catch (err => {
      console.log(err);
      res.sendStatus(400).json(err);
    });
  },

  //getUserById
  getUserById({ params }, res) {
    User.findOne({ _id: params.id})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => {
      if (!dbUserData) {
        return res.status(404).json({message: 'No user found with this id'});
      }
      res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
  },

  //createUser
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
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