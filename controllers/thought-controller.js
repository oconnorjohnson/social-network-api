const { Thought, User } = require('../models')
const thought404Message = (id) => `Thought with ID: ${id} does not exist.`
const thought200Message = (id) => `Thought with ID: ${id} has now been deleted.`
const reaction200Message = (id) => `Reaction with ID: ${id} has now been deleted.`

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(500).json(err))
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbThoughtData => dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({ message: thought404Message(params.id) }))
        .catch(err => res.status(404).json(err))
    },
    createThought({ body }, res) {
        Thought.create({ thoughtText: body.thoughtText, username: body.username })
        .then(({_id}) => User.findOneAndUpdate({ _id: body.userId}, { $push: { thoughts: _id } }, { new: true }))
        .then(dbThoughtData => res.json(dbThoughtdata))
        .catch(err => res.status(400).json(err))
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => dbThoughtData ? res.json(thought200Message(dbThoughtData._id)) : res.status(404).json({ message: thought404Message(params.id) }))
        .catch(err => res.status(404).json(err))
    },
    deleteThought({ params}, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => dbThoughtData ? res.json(thought200Message(dbThoughtData._id)) : res.status(404).json({ message: thought404Message(params.id) }))
        .catch(err => res.status(400).json(err))
    },
    createReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: { reactionBody: body.reactionBody, username: body.username} } },
            { new: true, runValidators: true })
        .then(dbThoughtData => dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({ message: thought404Message(params.id) }))
        .catch(err => res.status(400).json(err))
    },
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId}, { $pull: { reactions: { _id: params.reactionId} } }, { new: true})
        .then(dbThoughtData => dbThoughtData ? res.json(reaction200Message(params.thoughtId)) : res.status(404).json({ message: thought404Message(params.id) }))
        .catch(err => res.status(404).json(err))
    }
}

module.exports = thoughtController 