const items = [
    {
        id: '0000000001',
        title: 'First List',
        todos:['First todo of first list!'],
        completed: true,
        created: '2020/01/01'
    },
    {
        id: '0000000002',
        title: 'Second List',
        todos:['First todo of second list!'],
        completed: false,
        created: '2020/01/02'
    },
    {
        id: '0000000003',
        title: 'Third List',
        todos:['First todo of third list!'],
        completed: true,
        created: '2020/01/03'
    }
];

const data= [{
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
  },
  {
    "title": "title 2",
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
  }];
const getAllItems = () => items;
const getMockData = () => data;
export default { getAllItems, getMockData };
