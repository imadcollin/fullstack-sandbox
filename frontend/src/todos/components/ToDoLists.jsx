import React, { Fragment, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Typography from "@material-ui/core/Typography";
import { ToDoListForm } from "./ToDoListForm";
import ApiConfig from "../../ApiConfig";
import { Button, Checkbox, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Moment from "moment";

/********************************************************** */
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    marginRight: "50px",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  standardSpace: {
    margin: "0px",
  },
}));

/********************************************************** */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const ToDoLists = ({ style }) => {
  const [activeList, setActiveList] = useState();
  const [items, setItems] = useState({});
  const [itemTitle, setItemTitle] = useState("");
  const classes = useStyles();

  /********************************************************** */
  useEffect(() => {
    fetchGetAllItems();
  }, []);

  const fetchGetAllItems = async () => {
    const items = await sleep(500).then(() => ApiConfig.getAllItems());
    setItems([...items]);
  };
  /********************************************************** */
  const deleteItem = (item) => {
    console.log(item._id);
    const cleanItemList = items.filter((x) => x._id !== item._id);
    ApiConfig.deleteItem(item._id);

    setItems(cleanItemList);
  };

  /********************************************************** */
  const updateItem = async (e, newItem) => {
    let payload = newItem;

    // //e.stopPropagation();
    await ApiConfig.updateItem(payload._id, payload);

    fetchGetAllItems();
  };
  const addItem = () => {
    if (itemTitle) {
      const item = {
        title: itemTitle,
        todos: [],
        completed:false
      };
      setItemTitle("");
      ApiConfig.postItem(item);
      fetchGetAllItems();
    } 
    else alert("no title");
     
  };

  /********************************************************** */
  if (!Object.keys(items).length) return null;
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component="h2">My ToDo Lists</Typography>
          <List>
            {Object.keys(items).map((key) => (
              <div key={key} className={classes.root}>
                <ListItem key={key} button onClick={() => setActiveList(key)}>
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary={items[key].title} />

                  <ListItemText
                    primary={`  ${Moment(items[key].created).format(
                      "YYYY-MM-DD"
                    )}`}
                  />

                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      disabled
                      color="primary"
                      checked={items[key].completed}
                      disableRipple
                    />
                  </ListItemIcon>

                  <Button
                    size="small"
                    color="secondary"
                    className={classes.standardSpace}
                    onClick={() => {
                      deleteItem(items[key]);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </ListItem>
              </div>
            ))}
          </List>
          <div>
            <ListItem>
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>

              <TextField
                label="Item title"
                value={itemTitle}
                readOnly
                style={{width:"80%"}}
                onChange={(e) => setItemTitle(e.target.value)}
                className={classes.textField}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ padding: "1%" }}
                onClick={addItem}
              >
                Add Item
              </Button>
            </ListItem>
          </div>
        </CardContent>
      </Card>
      {items[activeList] && (
        <ToDoListForm
          key={activeList}
          toDoList={items[activeList]}
          deleteItem={deleteItem}
          updateItem={updateItem}
        />
      )}
    </Fragment>
  );
};
