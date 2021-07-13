//! Schemas go here

const mongoose = require("mongoose");

const post_schema = mongoose.Schema({
    thread_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Thread"
    },
    author: String,
    body  : String
}, {
    timestamps: true
});

const thread_schema = mongoose.Schema({
    name       : String,
    description: String,
    author     : String,
    category   : String,
    posts      : [post_schema],
}, {
    timestamps: true
})

const Thread = mongoose.model("Thread", thread_schema);

module.exports = Thread;