import { Node } from '../model/node';
import { api } from '../util/api';

export const addNode = async (node: Node) => {
  const res = await api.post('/tree', node);
  if (res.status !== 200) throw new Error(res.statusText);
};
