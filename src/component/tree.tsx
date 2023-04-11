import { useEffect, useState } from 'react';
import { api } from '../util/api';
import { Node } from '../model/node';
import { NodeModal } from './nodeModal';

const testData: any[] = [
  {
    id: 1,
    name: 'root',
    parentId: 0,
    height: 1,
    departmentName: 'name',
    role: 'manager',
    children: [
      {
        id: 9,
        name: 'root',
        parentId: 2,
        height: 2,
        departmentName: 'name',
        role: 'manager',
        children: [
          {
            id: 11,
            name: 'root',
            parentId: 2,
            height: 2,
            departmentName: 'name',
            role: 'manager',
          },
        ],
      },
    ],
  },
//   {
//     id: 2,
//     name: 'root',
//     parentId: 0,
//     height: 1,
//     departmentName: 'name',
//     role: 'manager',
//   },
//   {
//     id: 3,
//     name: 'root',
//     parentId: 0,
//     height: 1,
//     departmentName: 'name',
//     role: 'manager',
//   },
//   {
//     id: 4,
//     name: 'root',
//     parentId: 0,
//     height: 1,
//     departmentName: 'name',
//     role: 'manager',
//   },
//   {
//     id: 5,
//     name: 'root',
//     parentId: 2,
//     height: 2,
//     departmentName: 'name',
//     role: 'manager',
//   },
//   {
//     id: 7,
//     name: 'root',
//     parentId: 2,
//     height: 2,
//     departmentName: 'name',
//     role: 'manager',
//   },
];

// TODO: type need to be changed
const recursive = (node: any) => {
    console.log(node.children)
    return <>
        <div key={node.id}>
            {`${"┗".padStart(node.height,'　　　　')} ${node.name} ${node.id} ${node.parentId}  ${node.role} ${node.role === 'manager' ? node.departmentName : node.programmingLanguage}`}
            <NodeModal parentId={node.id} height={node.height + 1} /> 
        </div>
        {node.children ? node.children.map(recursive) : null}
    </>
};

const test = () => {
    return <h1>TEST</h1>
}

export const Tree = () => {
  return (
    <>
      {testData.map(recursive)}
      {test()}
    </>
  );
};
