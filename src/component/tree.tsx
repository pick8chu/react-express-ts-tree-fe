import { Fragment, ReactElement, useEffect, useState } from 'react';
import { Node, TreeNode } from '../model/node';
import { NodeModal } from './nodeModal';
import styled from 'styled-components';
import { deleteNode, getTree } from '../api/treeHandler';
import { Button } from 'react-bootstrap';

const getTitle = (node: Node) => {
  return `
id: ${node.id}
name: ${node.name}
parentId: ${node.parentId}
height: ${node.height}
role: ${node.role}`;
};

const TreeBox = styled.div`
  border: 1px solid white;
  padding: 30px;
  margin: 30px;
`;

const WarningSpan = styled.span`
  color: red;
  font-weight: bold;
`;

export const Tree = () => {
  const [root, setRoot] = useState<TreeNode | undefined>(undefined);

  useEffect(() => {
    const fetchRoot = async () => getRoot();
    fetchRoot();
  }, []);

  const getRoot = async () => {
    setRoot(await getTree());
  };

  const deleteCurrentNode = async (nodeId: string, parentId: string | null) => {
    if (!parentId) return;
    if (!window.confirm('Are you sure to delete this node?')) return;
    await deleteNode(nodeId, parentId);
    await getRoot();
  };

  const recursive = (treeNode: TreeNode): ReactElement => {
    const [tempNode, tempChildren] = [treeNode.node, treeNode.children];

    return (
      // Fragment is used to avoid warning: "Each child in a list should have a unique "key" prop."
      <Fragment key={`${tempNode.id}`}>
        <div title={getTitle(tempNode)}>
          <span>{`${'┗'.padStart(tempNode.height + 1, '　　　　')} ${tempNode.name} ${tempNode.role} ${tempNode.role === 'manager' ? tempNode.departmentName : tempNode.programmingLanguage}`}</span>
          <NodeModal parentId={tempNode.id} height={tempNode.height + 1} cb={getRoot} />
          {tempNode.parentId && (
            <Button variant="warning" onClick={() => deleteCurrentNode(tempNode.id, tempNode.parentId)}>
              delete
            </Button>
          )}
        </div>
        {tempChildren ? tempChildren.map(childTreeNode => recursive(childTreeNode)) : null}
      </Fragment>
    );
  };

  return (
    <>
      {/* change root node button */}
      <NodeModal parentId={null} height={0} cb={getRoot} />
      {/* tree div */}
      <TreeBox>{root ? recursive(root) : <WarningSpan>root is not found...</WarningSpan>}</TreeBox>
    </>
  );
};
