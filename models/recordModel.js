var mongoose = require("mongoose");
const {Schema, isValidObjectId} = require("mongoose");
const schema = mongoose.Schema;

const recordsSchema = new Schema({
    _id: {
        type: Object,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    counts: {
        type: [Number],
        required: true
    },
    value: {
        type: String,
        required: true
    }

})


const Records = mongoose.model("records", recordsSchema);

module.exports = Records;

