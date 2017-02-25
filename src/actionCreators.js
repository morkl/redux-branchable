import * as actionTypes from './actions';

export function goToSpecificAction(branch, action) {
  return {
    type: actionTypes.SET_CURRENT_ACTION,
    branch,
    action,
  };
}
