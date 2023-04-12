export type Node = {
  id: string;
  name: string;
  parentId: string;
  height: number;
} & (
  | {
      departmentName: string;
      role: 'manager';
    }
  | {
      programmingLanguage: string;
      role: 'employee';
    }
);

export type TreeNode = {
  node: Node;
  children?: TreeNode[];
};
