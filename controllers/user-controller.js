const { User } = require('../models');

const userController = {
  //get all users /api/users
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

  //getUserById /api/users/:id
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

  //createUser api/
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
  },

  //updateUser api/:id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      body,
      {new: true, runValidators: true})
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  //deleteUser api/:id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
      console.log(dbUserData);
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user found with this id'});
        }
      // remove the user from friends arrays
      User.updateMany(
        { _id : { $in: dbUserData.friends } },
        { $pull: { friends: params.id } },
      )
      .then(() => {

        // remove any thoughts from this user
        Thought.deleteMany({ username : dbUserData.username })
        .then(() => {

          res.json({ message: "deleted user thoughts" });
        })
        .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
  },

  //addFriend /api/users/:userId/friends/:friendId
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
    .then(dbUserData => {
      if(!dbUserData) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      User.findOneAndUpdate(
        { _id: params.friendId },
        { $addToSet: { friends: params.userId } },
        { new: true, runValidators: true }
      )
      .then(dbFriendData => {
        if(!dbFriendData) {
          return res.status(404).json({ message: 'No user found with this friendId' });
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
  },

  //deleteFriend /api/users/:userId/friends/:friendId
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
    .then(dbUserData => {
      if(!dbUserData) {
        return res.status(404).json({ message: 'No user found with this id' });
      }
      User.findOneAndUpdate(
        { _id: params.friendId },
        { $pull: { friends: params.userId } },
        { new: true, runValidators: true }
      )
      .then(dbFriendData => {
        if(!dbFriendData) {
          return res.status(404).json({ message: 'No user found with this friendId' });
        }
        res.json({ message: 'Friend deleted' });
      })
      .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
  }
};



module.exports = userController;