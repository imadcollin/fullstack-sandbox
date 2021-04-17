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
  const classes = useStyles();
  const [todos, setTodos] = useState(toDoList.todos);
  const [check, setCheck] = useState(false);
  const [taskTitle1, setTaskTitle1] = useState("");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleCheck = (id, e, t) => {
    if (!(t.taskTitle || taskTitle1)) {
      alert("Please give a title...!");
      e.target.checked = false;
      return;
    }
    let title;
    if (t.taskTitle) title = t.taskTitle;
    else title = taskTitle1;

    let updateTodo = t;
    updateTodo.completed = !t.completed;
    updateTodo.taskTitle = title;
    setTaskTitle1(null);
    const modifiedList = todos.map((item) =>
      item._id === t._id ? updateTodo : item
    );
    setTodos(modifiedList);
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
  const addTodo = (e, id, todoItem) => {
    const updateTodo = {
      taskTitle: taskTitle1,
      completed: check,
    };
    todoItem.pop();
    todoItem.push(updateTodo);
    setTodos([...todos, todoItem]);
    updateItem(e, manipulateItem(id, todoItem));
  };

  // const autoSave = async (event, id, todos) => {
  //   debounced();
  //   await sleep(1500);
  //   if (isSearching) console.log("Firing .....");
  //   //  addTodo(event, id, todos);
  // };

  const autoSave = useDebouncedCallback((e, id, todos) => {
    addTodo(e, id, todos);
  }, 1000);

  const deleteTodo = (id, e, todo) => {
    const cleanList = todos.filter((item) => item._id !== todo._id);
    setTodos(cleanList);
    updateItem(e, manipulateItem(id, cleanList));
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
                onInput={(e) => setTaskTitle1(e.target.value)}
                onChange={(e) => autoSave(e, toDoList._id, todos)}
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
                onClick={(e) => handleCheck(toDoList._id,e, todos[index])}
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
                setTodos([...todos, { id: "red" }]);
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={(e) => addTodo(e, toDoList._id, todos)}
            >
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};
