import { ReactElement, useEffect, useState } from 'react';
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

const TreeWrapper = styled.div`
  border: 1px solid white;
  padding: 30px;
  margin: 30px;
`;

export const Tree = () => {
  const [data, setData] = useState<TreeNode[]>([]);

  useEffect(() => {
    const fetchData = async () => getData();
    fetchData();
  }, []);

  const getData = async () => {
    setData(await getTree());
  };

  const deleteData = async (nodeId: string, parentId: string | null) => {
    if (!parentId) return;
    if (!window.confirm('Are you sure to delete this node?')) return;
    await deleteNode(nodeId, parentId);
    await getData();
  };

  const recursive = (treeNode: TreeNode): ReactElement => {
    const [tempNode, tempChildren] = [treeNode.node, treeNode.children];
    return (
      <>
        <div key={tempNode.id} title={getTitle(tempNode)}>
          {`${'┗'.padStart(tempNode.height + 1, '　　　　')} ${tempNode.name} ${tempNode.role} ${tempNode.role === 'manager' ? tempNode.departmentName : tempNode.programmingLanguage}`}
          <NodeModal parentId={tempNode.id} height={tempNode.height + 1} cb={getData} />
          {tempNode.parentId && (
            <Button variant="warning" onClick={() => deleteData(tempNode.id, tempNode.parentId)}>
              delete
            </Button>
          )}
        </div>
        {tempChildren ? tempChildren.map(treeNode => recursive(treeNode)) : null}
      </>
    );
  };

  return (
    <>
      <NodeModal parentId={null} height={0} cb={getData} />
      <TreeWrapper>{data.map(treeNode => recursive(treeNode))}</TreeWrapper>
    </>
  );
};
