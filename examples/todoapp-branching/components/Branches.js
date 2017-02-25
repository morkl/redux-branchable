import React, { PropTypes } from 'react'
import Todo from './Todo'

import Tree from 'react-tree-graph';


let ids = 0;

const Branch = ({ branch, goToLeaf, currentBranch, currentDepth }) => {
  const style = (currentBranch === branch.branch && currentDepth === branch.depth) ? {color:"red"} : {}
  return (
    <li>
      <a href="#" style={style} onClick={goToLeaf.bind(this, branch.branch, branch.depth)}>{branch.branch}/{branch.depth}: {branch.action.type}</a> <span>{JSON.stringify(branch.action)}</span>
      <ul>
        {branch.children.map((x, i) => <Branch key={i} branch={x} goToLeaf={goToLeaf} currentBranch={currentBranch} currentDepth={currentDepth}/>)}
      </ul>
    </li>
  )
};

function treeify(node, branch, depth, goToLeaf) {
  return {
    label: node.action.type,
    key: node.branch + "_" + node.depth,
    children: node.children.map(x => treeify(x, branch, depth, goToLeaf)),
    className: (node.branch === branch && node.depth === depth) ? "node active" : "node",
    onClick: () => goToLeaf(node.branch, node.depth),
  }
}

const Branches = ({ rootBranch, goToLeaf, currentBranch, currentDepth }) => (
  <div style={{backgroundColor: "gray"}}>
    <div>
      <Tree height={600} width={800} data={treeify(rootBranch, currentBranch, currentDepth, goToLeaf)} labelProp="label" keyProp="key" />
    </div>
    <div>
    <ul>
      <Branch branch={rootBranch} goToLeaf={goToLeaf} currentBranch={currentBranch} currentDepth={currentDepth}/>
    </ul>
    </div>
  </div>
);
export default Branches
