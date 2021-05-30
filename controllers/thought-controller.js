const { Thought, User } = require('../models');

const thoughtController = {
  //getAllThoughts /api/thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .populate({ path: 'reactions',
      select: '-__v' 
    })
    .select('-__v')
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch (err => {
      console.log(err);
      res.sendStatus(400).json(err);
    });
  },

  //getOneThoughtById /api/thoughts/:id
  getThoughtById({ params }, res) {
    console.log('params', params)
      Thought.findOne({ _id: params.id })
      .populate({ 
        path: 'reactions',
        select: '-__v' 
      })
      .select('-__v')
      .then(dbThoughtData => {
        console.log('dbThoughtData', dbThoughtData)
          if (!dbThoughtData) {
            return res.status(404).json({message: 'No thought found with this id' });
          }
          res.json(dbThoughtData);
      })
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      });
  },

  //createOneThought /api/thoughts
  createThought({ params, body }, res) {
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
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  //addReaction /api/:thoughtId/reactions/
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
    .then(dbUserData => {
      console.log('dbUserData', dbUserData)
      if(!dbUserData) {
        return res.status(404).json({ message: 'No user fouund with this id!' });
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },

  //removeReaction api/:thoughtId/reactions/:reactionId
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
    .then(dbThoughtData =>  {
      console.log(dbThoughtData);
      if(!dbThoughtData) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      res.json({ message: 'Reaction removed' });
    })
    .catch(err => res.status(404).json(err));
  },

  //updateOneThoughtById /api/thoughts/:id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true }
    )
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        return res.status(404).json({ message: 'No thought found with this id!'});
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
  },

  //deleteOneThoughtById /api/thoughts/:userId/:thoughtId
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(dbThoughtData => {
      console.log('dbThoughtData', dbThoughtData);
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought found with this id!' });
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