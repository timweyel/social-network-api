const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function(value) {
        return isEmail(value);
      },
      message: 'Please enter a valid email address',
    }
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},
{
  toJSON: {
      virtuals: true
  },
  id: false
});

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

module.exports = model('User', userSchema);