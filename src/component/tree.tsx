import { ReactElement, useEffect, useState } from 'react';
import { Node, TreeNode } from '../model/node';
import { NodeModal } from './nodeModal';
import styled from 'styled-components';
import { getTree } from '../api/treeHandler';

const getTitle = (node: Node) => {
  return `
id: ${node.id}
name: ${node.name}
parentId: ${node.parentId}
height: ${node.height}
role: ${node.role}`;
};

const TreeWrapper = styled.div`
  border: 1px solid white;
  padding: 30px;
`;

// const NodeWrapper = styled.div`
//     // border: 1px solid white;
//     // padding: 3px;
//     // margin: 3px;
// `

export const Tree = () => {
  const [data, setData] = useState<TreeNode[]>([]);

  useEffect(() => {
    const fetchData = async () => updateData();
    fetchData();
  }, []);

  const updateData = async () => {
    const result = await getTree();
    setData(result);
  };

  // TODO: Change the TreeNode[] data structure to Map as {{parentId}: Node[]} so I don't have to send the whole data
  // const recursiveCallback = (parentStack: string[], node: Node) => {

  const recursive = (treeNode: TreeNode): ReactElement => {
    const [tempNode, tempChildren] = [treeNode.node, treeNode.children];
    return (
      <>
        <div key={tempNode.id} title={getTitle(tempNode)}>
          {`${'┗'.padStart(tempNode.height + 1, '　　　　')} ${tempNode.name} ${tempNode.role} ${tempNode.role === 'manager' ? tempNode.departmentName : tempNode.programmingLanguage}`}
          <NodeModal parentId={tempNode.id} height={tempNode.height + 1} cb={updateData} />
        </div>
        {tempChildren ? tempChildren.map(treeNode => recursive(treeNode)) : null}
      </>
    );
  };

  return <TreeWrapper>{data.map(treeNode => recursive(treeNode))}</TreeWrapper>;
};
