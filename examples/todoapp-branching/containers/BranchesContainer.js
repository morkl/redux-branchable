import { connect } from 'react-redux'
import { goToSpecificAction } from 'redux-branchable'
import Branches from '../components/Branches'


const denormalizeBranches = (currentBranch, currentAction, branches) => {
  const branch = branches[currentBranch];
  const actionChild = (branch.actions.length > (currentAction + 1)) ? denormalizeBranches(currentBranch, currentAction + 1, branches) : null;
  const subBranches = branches.filter(x => x.parent !== null && x.parent.branch === currentBranch && x.parent.action === currentAction);
  const branchChildren = subBranches
    .map(x => branches.indexOf(x))
    .map(x => denormalizeBranches(x, 0, branches));
  const children = [actionChild, ...branchChildren].filter(x => x !== null);
  return {
    key: currentBranch + "_" + currentAction,
    action: branch.actions[currentAction],
    type: branch.actions[currentAction].type,
    branch: currentBranch,
    depth: currentAction,
    children
  }
}

const mapStateToProps = (state) => ({
  rootBranch: denormalizeBranches(state.branches.findIndex(x => x.parent === null), 0, state.branches),
  currentBranch: state.currentBranch,
  currentDepth: state.currentAction,
})

const mapDispatchToProps = (dispatch) => ({
  goToLeaf: (branch, depth) => dispatch(goToSpecificAction(branch, depth))
});

const BranchesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Branches)

export default BranchesContainer
