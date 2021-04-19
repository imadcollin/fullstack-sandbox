const Task = require("./models/task.model");

class TaskRepository {
  constructor(model) {
    this.model = model;
  }

  create(x) {
      console.log("todo")
      console.log(x)
    const newTask = {
    taskTitle: x.taskTitle,
      completed: false,
    };
    const task = new this.model(newTask);

    return task.save();
  }

  findAll() {
    return this.model.find();
  }

  findById(id) {
    return this.model.findById(id);
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  updateById(id, object) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, {
      $set: {
        title: object.title,
        completed: object.completed,
      },
    });
  }
}

module.exports = new TaskRepository(Task);
