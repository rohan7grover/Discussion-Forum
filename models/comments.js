const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    replies: {
        type: Array, 
        default: void 0
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;