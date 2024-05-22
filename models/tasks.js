const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var taskSchema = new Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
        default: Date.now,
    }
});
module.exports = mongoose.model("Task",taskSchema);