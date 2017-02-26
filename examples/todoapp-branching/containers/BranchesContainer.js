import { connect } from 'react-redux'
import { goToSpecificAction, getBranchStateAsTree } from 'redux-branchable'
import Branches from '../components/Branches'

const mapStateToProps = (state) => ({
  rootBranch: getBranchStateAsTree(state.branches),
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
