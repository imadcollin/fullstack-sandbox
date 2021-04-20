const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
  id: String,
  taskTitle: String,
  completed: Boolean,
  created: {type: Date, default: Date.now},
  overdue: String,
  remain: String

},{ _id :true,// false
});

module.exports =Task= mongoose.model("Task", TaskSchema);
module.exports.TaskSchema = TaskSchema;

