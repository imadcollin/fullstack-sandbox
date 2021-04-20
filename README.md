# Sellpy Sandbox

Welcome to the Sellpy Sandbox environment for fullstack development!

Start by forking the repository.

## Prerequisites

NodeJS - https://nodejs.org/en/download/

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

### Development set-up
If you don't have a favorite editor we highly recommend [VSCode](https://code.visualstudio.com). We've also had some ESLint rules set up which will help you catch bugs etc. If you're using VSCode, install the regular [ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and you should be good to go!

You can open the root folder in one workspace, or `/frontend` and `/backend` in seperate workspaces - both should work fine.

### The Stack
Build using MERN stack, therefore you need to run the server and POST some data in order to get started. 

### To-do 
1. Title editing functionality.
2. Merging Overdue branch 
3. Refactoring
4. Add _isLoading feature 
5. Add env file


### DB
Mongoos collection as follows:    


GET master branch
```json
[
    {
        "_id": "607ebace5db838a3e44c6ac4",
        "title": "title 1",
        "todos": [
            {
                "_id": "607ebace5db838a3e44c6ac5",
                "taskTitle": "task 1",
                "completed": true,
                "remain": "0",
                "created": "2021-04-20T11:28:14.304Z"
            },
            {
                "_id": "607ebace5db838a3e44c6ac6",
                "taskTitle": "task 2",
                "completed": true,
                "remain": "0",
                "created": "2021-04-20T11:28:14.304Z"
            }
        ],
        "completed": true,
        "created": "2021-04-20T11:28:14.306Z",
        "__v": 0
    }
]
```

POST master branch
```json
    {
        "title": "title 1",
        "completed": true,
        "todos" : [
             {
                 "taskTitle": "task 1",
                "completed": false

            },
              {
                 "taskTitle": "task 2",
                "completed": true
            }
        ]

    }
```


GET Ovderdue branch
```json
[
    {
        "_id": "607df35ae0742781c5a8e62e",
        "title": "title 1",
        "todos": [
            {
                "_id": "607df1c2a56d7b810472180a",
                "completed": false,
                "overdue": "04/23/2021",
                "remain": "4",
                "created": "2021-04-19T21:10:26.904Z"
            },
            {
                "_id": "607df1c2a56d7b810472180b",
                "completed": true,
                "remain": "11",
                "created": "2021-04-19T21:10:26.905Z",
                "overdue": "04/30/2021"
            }
        ],
        "completed": false,
        "created": "2021-04-19T21:17:14.781Z",
        "__v": 0
    }
]
```