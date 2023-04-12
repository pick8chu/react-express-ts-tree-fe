import { Node } from '../model/node';
import { api } from '../util/api';

export const addNode = async (node: Node) => {
  const res = await api.post('/tree', node);
  console.log(res);
  if (res.status !== 200) throw new Error(res.statusText);
};

export const getTree = async () => {
  const res = await api.get('/tree');
  if (res.status !== 200) throw new Error(res.statusText);
  return res.data;
};
