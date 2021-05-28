const { Thought, User } = require('../models');

const thoughtController = {
  //getAllThoughts /api/thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .select('-__v')
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch (err => {
      console.log(err);
      res.sendStatus(400).json(err);
    });
  },

  //getOneThoughtById /api/thoughts/:id
  getThoughtById(req, res) {
    Thought.findOne({ _id: params.id })
    .select('-__v')
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },

  //createOneThought /api/thoughts
  createThought({ params, body }, res) {
    // console.log('body', body);
    // console.log('params', params);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId},
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!'});
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  //updateOneThoughtById /api/thoughts/:id
  updateThought() {

  },

  //deleteOneThoughtById /api/thoughts/:userId/:thoughtId
  deleteThought({ params }, res) {
    console.log('params', params);
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(dbThoughtData => {
      console.log('dbThoughtData', dbThoughtData);
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { thoughts: params.thoughtId } },
        { new: true }
      );
    })
    .then(dbUserData => {
      if(!dbUserData) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(500).json(err));
  }
};

module.exports = thoughtController;