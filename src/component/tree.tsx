import { ReactElement, useEffect, useState } from 'react';
import { api } from '../util/api';
import { Node, TreeNode } from '../model/node';
import { NodeModal } from './nodeModal';
import styled from 'styled-components';
import { JsxElement } from 'typescript';

const testData: TreeNode[] = [
  {
    node: {id: "1",
        name: 'root',
        parentId: "0",
        height: 1,
        departmentName: 'name',
        role: 'manager',},
    children: [
      {
        node: {
            id: "9",
            name: 'root',
            parentId: "2",
            height: 2,
            departmentName: 'name',
            role: 'manager',},
        children: [
          {
            node: {
                id: "11",
                name: 'root',
                parentId: "2",
                height: 3,
                departmentName: 'name',
                role: 'manager',
            },
            children: [
              {
                node: {
                    id: "11",
                    name: 'root',
                    parentId: "2",
                    height: 4,
                    departmentName: 'name',
                    role: 'manager',
                },
                children: [
                  {
                    node: {
                        id: "15",
                        name: 'root',
                        parentId: "2",
                        height: 5,
                        departmentName: 'name',
                        role: 'manager',}
                  },
                ],
              },
            ],
          },
          {
            node: {
                id: "9",
                name: 'root',
                parentId: "2",
                height: 2,
                departmentName: 'name',
                role: 'manager',},
              children: [
                {
                  node: {
                      id: "15",
                      name: 'root',
                      parentId: "2",
                      height: 5,
                      departmentName: 'name',
                      role: 'manager',}
                },
              ],}
        ],
      },
    ],
  },
  {
    node: {id: "1",
        name: 'root',
        parentId: "0",
        height: 1,
        departmentName: 'name',
        role: 'manager',},
    children: [
      {
        node: {
            id: "9",
            name: 'root',
            parentId: "2",
            height: 2,
            departmentName: 'name',
            role: 'manager',
        },
      }
    ]
  },
];

const getTitle = (node: Node) => {
    return `
id: ${node.id}
name: ${node.name}
parentId: ${node.parentId}
height: ${node.height}
role: ${node.role}`
}

const TreeWrapper = styled.div`
    border: 1px solid white;
    padding: 30px;
`

// const NodeWrapper = styled.div`
//     // border: 1px solid white;
//     // padding: 3px;
//     // margin: 3px;
// `

export const Tree = () => {
    const [data, setData] = useState<TreeNode[]>(testData);

    // TODO: Change the TreeNode[] data structure to Map as {{parentId}: Node[]} so I don't have to send the whole data 
    // const recursiveCallback = (parentStack: string[], node: Node) => {


    const recursive = (treeNode: TreeNode, curParent: string[]):ReactElement => {
        const [tempNode, tempChildren] = [treeNode.node, treeNode.children];
        curParent.push(tempNode.id);
        console.log(curParent);
        return <>
            <div key={tempNode.id} title={`${getTitle(tempNode)}, ${curParent}`}>
                {`${"┗".padStart(tempNode.height,'　　　　')} ${tempNode.name} ${tempNode.role} ${tempNode.role === 'manager' ? tempNode.departmentName : tempNode.programmingLanguage}`}
                <NodeModal parentStack={curParent} height={tempNode.height + 1}/> 
            </div>
            {tempChildren ? tempChildren.map((treeNode) => recursive(treeNode, curParent)) : null}
        </>
    };

  return (
    <TreeWrapper>
      {data.map((treeNode) => recursive(treeNode, []))}
    </TreeWrapper>
  );
};
