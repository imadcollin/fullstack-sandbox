import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Moment from "moment";
import { useDebouncedCallback } from "use-debounce";
const useStyles = makeStyles({
  card: {
    margin: "1rem",
  },
  todoLine: {
    display: "flex",
    alignItems: "center",
  },
  textField: {
    flexGrow: 1,
  },
  standardSpace: {
    margin: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
});

export const ToDoListForm = ({ toDoList, updateItem }) => {
  const [todos, setTodos] = useState(toDoList.todos);
  const [taskTitle1, setTaskTitle1] = useState("b"); // Not null onloading.
  const [check] = useState(false);
  const [text, setText] = useState("");

  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleCheck = (id, e, todo) => {

    if (!(todo.taskTitle || taskTitle1)) {
      alert("Please give a title...!");
      e.target.checked = false;
      return;
    }

    let title;
    if (todo.taskTitle) title = todo.taskTitle;
    else title = taskTitle1;

    let updateTodo = todo;
    updateTodo.completed = !todo.completed;
    updateTodo.taskTitle = title;

    const modifiedList = todos.map((item) =>
      item._id === todo._id ? updateTodo : item
    );

    const updatedITem = manipulateItem(id, modifiedList);
    updateItem(e, updatedITem);
  };

  const manipulateItem = (id, newTodos) => {
    return {
      _id: id,
      title: toDoList.title,
      compeleted: toDoList.compeleted,
      todos: newTodos,
    };
  };

  const save = (e, id, todoItem) => {
    const updateTodo = {
      taskTitle: taskTitle1,
      completed: check,
    };
    todoItem.pop();
    todoItem.push(updateTodo);
    const newItem = manipulateItem(id, todoItem);
    updateItem(e, newItem);
  };

  const autoSave = useDebouncedCallback((e, id, todos) => {
    save(e, id, todos);
  }, 1000);

  const deleteTodo = (id, e, todo) => {
    const cleanList = todos.filter((item) => item._id !== todo._id);
    setTodos(cleanList);
    updateItem(e, manipulateItem(id, cleanList));
  };
  const handleInputAndSave = (e, id, todos) => {
    setTaskTitle1(e.target.value);
    autoSave(e, id, todos);
  };

  const addOneItem = (todos) => {
    if (taskTitle1) {
      setTodos([...todos, {}]);
      setTaskTitle1(null);
      setText("");
    } else setText("Please give a title for the Todo first.");
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h2">{toDoList.title}</Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map(({ taskTitle, completed, created }, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant="h6">
                {index + 1}
              </Typography>
              <TextField
                label="What to do?"
                value={taskTitle}
                readOnly
                disabled={taskTitle}
                onInput={(e) => handleInputAndSave(e, toDoList._id, todos)}
                //onChange={(e) => autoSave(e, toDoList._id, todos)}
                className={classes.textField}
              />
              <span style={{ padding: "5px", fontWeight: "bolder" }}>
                Created:
              </span>
              {Moment(created).format("YYYY-MM-DD")}
              <span
                style={{ paddingLeft: "15px", fontWeight: "bolder" }}
              ></span>{" "}
              <Checkbox
                checked={completed}
                value="test"
                onClick={(e) => handleCheck(toDoList._id, e, todos[index])}
              ></Checkbox>
              <Button
                size="small"
                color="secondary"
                padding="50px"
                className={classes.standardSpace}
                onClick={(e) => {
                  deleteTodo(toDoList._id, e, todos[index]);
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type="button"
              color="primary"
              onClick={() => {
                addOneItem(todos);
              }}
            >
              Add Todo <AddIcon />
            </Button>
            {/* <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={(e) => addTodo(e, toDoList._id, todos)}
            >
              Save
            </Button> */}
            <Typography color="error" component="h2">
              {text}
            </Typography>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};
