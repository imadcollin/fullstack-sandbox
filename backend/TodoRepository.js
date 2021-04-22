const Todo = require("./models/todo.model");
var moment = require("moment"); // require

class TodoRepository {
  constructor(model) {
    this.model = model;
  }

  create(title, todos, completed) {
    const newTodo = {
      title: title,
      todos: remain(todos),
      completed: isCompleted(todos),
    };
    const todo = new this.model(newTodo);

    return todo.save();
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
    const updateTodos = remain(object.todos);

    const query = { _id: id };
    return this.model.findOneAndUpdate(query, {
      $set: {
        taskTitle: object.taskTitle,
        todos: updateTodos,
        completed: isCompleted(object.todos),
        // completed: object.completed,
      },
    });
  }
}
const isCompleted = (todos) => {
  if (todos.every((x) => x.completed == true)) return true;
  return false;
};

const remain = (todos) => {
  for (let i = 0; i < todos.length; i++) {
    todos[i].remain = calcDays(todos[i].created, todos[i].overdue);
  }
  return todos;
};
const calcDays = (created, over) => {
  create = moment(created).format("MM/DD/YYYY");
  const date1 = new Date(create);
  const date2 = new Date(over);
  const diffInMs = Math.abs(date2 - date1);
  let x = diffInMs / (1000 * 60 * 60 * 24);
  return x | 0;
};
module.exports = new TodoRepository(Todo);
