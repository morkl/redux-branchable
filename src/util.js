const defaultCreateLeaf = (branchState, currentBranch, currentDepth, children) => ({
  action: branchState.actions[currentDepth],
  branch: currentBranch,
  depth: currentDepth,
  children,
});

export function getBranchStateAsTree(currentBranch, currentDepth, branches,
  createLeaf = defaultCreateLeaf) {
  const branch = branches[currentBranch];
  const actionChild = (branch.actions.length > (currentDepth + 1))
    ? getBranchStateAsTree(currentBranch, currentDepth + 1, branches)
    : null;
  const subBranches = branches
    .filter(x => x.parent !== null)
    .filter(x => x.parent.branch === currentBranch && x.parent.action === currentDepth);
  const branchChildren = subBranches
    .map(x => branches.indexOf(x))
    .map(x => getBranchStateAsTree(x, 0, branches));
  const children = [actionChild, ...branchChildren].filter(x => x !== null);
  return createLeaf(branch, currentBranch, currentDepth, children);
}
