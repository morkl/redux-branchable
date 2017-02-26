const defaultCreateLeaf = (branchState, currentBranch, currentDepth, children) => ({
  action: branchState.actions[currentDepth],
  branch: currentBranch,
  depth: currentDepth,
  children,
});

export function getSpecificBranchStateAsTree(currentBranch, currentDepth, branches,
  createLeaf = defaultCreateLeaf) {
  const branch = branches[currentBranch];
  const actionChild = (branch.actions.length > (currentDepth + 1))
    ? getSpecificBranchStateAsTree(currentBranch, currentDepth + 1, branches)
    : null;
  const subBranches = branches
    .filter(x => x.parent !== null)
    .filter(x => x.parent.branch === currentBranch && x.parent.action === currentDepth);
  const branchChildren = subBranches
    .map(x => branches.indexOf(x))
    .map(x => getSpecificBranchStateAsTree(x, 0, branches));
  const children = [actionChild, ...branchChildren].filter(x => x !== null);
  return createLeaf(branch, currentBranch, currentDepth, children);
}

export function getBranchStateAsTree(branches) {
  return getSpecificBranchStateAsTree(branches.findIndex(x => x.parent === null), 0, branches);
}
