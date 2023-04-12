import { Node } from '../model/node';
import { api } from '../util/api';

export const addNode = async (node: Node) => {
  const res = await api.post('/trees', node);
  console.log(res);
  if (res.status !== 201) throw new Error(res.statusText);
};

export const getTree = async () => {
  const res = await api.get('/trees');
  if (res.status !== 200) throw new Error(res.statusText);
  return res.data;
};

export const deleteNode = async (nodeId: string, parentId: string) => {
  const res = await api.delete(`/trees/${nodeId}`, { data: { parentId } });
  if (res.status !== 204) throw new Error(res.statusText);
};

export const updateRootNode = async (node: Node) => {
  const res = await api.put('/trees/root', node);
  if (res.status !== 200) throw new Error(res.statusText);
};
