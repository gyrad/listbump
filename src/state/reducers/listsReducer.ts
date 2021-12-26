import { v4 as uuidv4 } from 'uuid';

const initialState = [
  {
    id: uuidv4(),
    title: 'Groceries',
    list: [
      {
        id: uuidv4(),
        content: 'Carrots',
        isCompleted: false,
      },
      {
        id: uuidv4(),
        content: 'Spinach',
        isCompleted: false,
      },
      {
        id: uuidv4(),
        content: 'Eggs',
        isCompleted: false,
      },
    ],
  },

  {
    id: uuidv4(),
    title: 'Movies to watch',
    list: [
      {
        id: uuidv4(),
        content: 'Die Hard',
        isCompleted: false,
      },
      {
        id: uuidv4(),
        content: 'Matrix',
        isCompleted: true,
      },
      {
        id: uuidv4(),
        content: 'Shrek',
        isCompleted: false,
      },
    ],
  },
];

export default function (todos = initialState, action) {
  switch (action.type) {
    case 'ADD_LIST':
      return [...todos, action.payload];
    default:
      return todos;
  }
}
