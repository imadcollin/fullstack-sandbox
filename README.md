# Sellpy Sandbox

Welcome to the Sellpy Sandbox environment for fullstack development!

Start by forking the repository.

## Prerequisites

NodeJS - https://nodejs.org/en/download/


### The Stack
Build using MERN stack, and the database is already set as a MongoDB cluster with some data, similarly another URL is provided for mongo service in case the cluster was not active.  

### Development set-up in short
1. Make sure the server is running (navigate to backend folder and run the server file)
2. Make sure Mongod service is running. (POST the json object, see DB section) 
3. Navigate to the client folder and run the client (frontend folder and run npm start)
4. Finally the browser should open automatically. 

More about how to run the application: 
## Getting started

### To start the backend:

 - Navigate to the backend folder
 - Run 'npm ci'
 - Run 'npm start'

### To start the frontend:

 - Navigate to the frontend folder
 - Run 'npm ci'
 - Run 'npm start'

 A browsertab will automatically open and load the app.

### To-do 
1. Title editing functionality.
2. Merging Overdue branch 
3. Refactoring
4. Add _isLoading feature 
5. Add env file for DB connection
6. Fix the bug when date is changed


### DB
Mongoos collection as follows:   
- The cluster already have some data.
- In case of using local mongo service here a sample of the object:  

POST master branch

```json
    {
        "title": "title 1",
        "todos": [
            {
                "taskTitle": "task 1",
                "completed": true,
                "overdue": "04/21/2021"
            },
            {
                "_id": "607f20373b212cb128eabd31",
                "taskTitle": "task 2",
                "completed": true,
                "overdue": "04/23/2021"
            }
        ]
    }

```


GET master branch
```json
{
    "_id": "607f23803b212cb128eabd3a",
    "title": "title 1",
    "todos": [
        {
            "_id": "607f23803b212cb128eabd3b",
            "taskTitle": "task 1",
            "completed": true,
            "overdue": "04/21/2021",
            "remain": "1",
            "created": "2021-04-20T18:54:56.119Z"
        },
        {
            "_id": "607f20373b212cb128eabd31",
            "taskTitle": "task 2",
            "completed": true,
            "overdue": "04/23/2021",
            "remain": "3",
            "created": "2021-04-20T18:54:56.119Z"
        }
    ],
    "completed": true,
    "created": "2021-04-20T18:54:56.119Z",
    "__v": 0
}
```
