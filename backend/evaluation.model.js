const mongoose = require('mongoose');

let EvaluationSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    movieid: {
        type: String,
        required: true,
    },
    evtitle: {
        type: String,
        required: true
    },
    evrating: {
        type: Number,
        required: true
    },
    evcontent: {
        type: String,
        required: true
    },
});
module.exports = mongoose.model('Evaluation', EvaluationSchema);
