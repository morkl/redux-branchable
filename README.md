# redux-branchable
_simple branching functionality for redux_

Inspired by [redux-undo](https://github.com/omnidan/redux-undo), this is a simple reducer enhancer for redux which enables branching time travel. All actions are saved, time travel is possible and encouraged, and any actions dispatched from a historic state result in a new branch being created.

Usage example:
```js
// setup
import todoApp from './reducers'
import {createBranchableReducer, goToSpecificAction} from 'redux-branchable'
const store = createStore(createBranchableReducer(todoApp))

// stuff happens in the app
dispatch(addTodo("i'm on the main/first branch"));
dispatch(addTodo("still on the first branch"));
dispatch(goToSpecificAction(0, 0)); // go back to the beginning
dispatch(addTodo("a new branch is created"));
dispatch(addTodo("more stuff on the second branch"));
dispatch(goToSpecificAction(0, 2)); // go back to the second action on the first branch
dispatch(addTodo("adding stuff to the first branch again"));
dispatch(goToSpecificAction(1, 0)); // go back to the beginning of the second branch
dispatch(addTodo("creating a new branch off of the second one"));
```

After the above exercise, the state should look something like this:
```js
{
  "currentState": { // this is where the current state goes
    "todos": [
      { "text": "a new branch is created", "completed": false },
      { "text": "creating a new branch off of the second one", "completed": false }
    ]
  },
  "currentBranch": 2, // the currently active branch
  "currentAction": 0, // the current depth within the active branch
  "branches": [
    { // first branch
      "parent": null,
      "actions": [
        { "type": "@@redux-branchable/INIT" }, // TODO: make this internal action unneccessary
        { "type": "ADD_TODO", "text": "i'm on the main/first branch" },
        { "type": "ADD_TODO", "text": "still on the first branch" },
        { "type": "ADD_TODO", "text": "adding stuff to the first branch again" }
      ]
    },
    { // second branch
      "parent": { // the branch and deptch from which this branch was created
        "branch": 0,
        "action": 0
      },
      "actions": [
        { "type": "ADD_TODO", "text": "a new branch is created" },
        { "type": "ADD_TODO", "text": "more stuff on the second branch" }
      ]
    },
    { // third branch
      "parent": {
        "branch": 1,
        "action": 0
      },
      "actions": [
        { "type": "ADD_TODO", "text": "creating a new branch off of the second one" }
      ]
    }
  ]
}
```

The historic state tree can be visualized within the app, and the visualization can be used to navigate quickly between the branches:
![http://i.imgur.com/e0yycvT.png]
