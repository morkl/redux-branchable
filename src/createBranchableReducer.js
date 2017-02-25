import * as actionTypes from './actions';

function updateSpecificIndexInArray(array, indexToUpdate, newStateDelegate) {
  return array.map((x, i) => (i === indexToUpdate ? newStateDelegate(x) : x));
}

function resolveStateUpToAction(reducer, branches, targetBranch, targetAction) {
  const branch = branches[targetBranch];
  const initialState = (branch.parent === null) ? reducer(undefined, { type: null })
    : resolveStateUpToAction(reducer, branches, branch.parent.branch, branch.parent.action);
  const newState = branch.actions
    .slice(0, targetAction + 1)
    .reduce(reducer, initialState);
  return newState;
}

export function createBranchableReducer(reducer) {
  return function branchableReducer(state = {
    branches: [
      {
        actions: [{ type: actionTypes.INIT }],
        parent: null,
      },
    ],
    currentBranch: 0,
    currentAction: 0,
    currentState: reducer(undefined, { type: null }),
  }, action) {
    switch (action.type) {
      case actionTypes.SET_CURRENT_ACTION:
        return {
          branches: state.branches,
          currentAction: action.action,
          currentBranch: action.branch,
          currentState: resolveStateUpToAction(reducer,
            state.branches, action.branch, action.action),
        };
      default: {
        const newState = reducer(state.currentState, action);

        if (newState === state.currentState) return state; // no change --> no care

        if (state.currentAction !== (state.branches[state.currentBranch].actions.length - 1)) {
          // new branch time
          return {
            branches: [
              ...state.branches,
              {
                actions: [action],
                parent: {
                  branch: state.currentBranch,
                  action: state.currentAction,
                },
              },
            ],
            currentBranch: state.branches.length,
            currentAction: 0,
            currentState: newState,
          };
        }
        return { // currently on latest action --> just add the action
          ...state,
          branches: updateSpecificIndexInArray(state.branches, state.currentBranch, branch => ({
            ...branch,
            actions: [
              ...branch.actions,
              action,
            ],
          })),
          currentState: newState,
          currentAction: state.currentAction + 1,
        };
      }
    }
  };
}
