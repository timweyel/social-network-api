const { User } = require('../models');
const reactionSchema = require('../models/Reaction');

const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find({})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
    .catch (err => {
      console.log(err);
      res.sendStatus(400);
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
  }
};

module.exports = userController;