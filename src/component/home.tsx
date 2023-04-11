import { useEffect, useState } from 'react';
import { api } from '../util/api';

export const Home = () => {
  const [data, setData] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get('');
      console.log(result);
      if (result.status === 200) setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>{data ? data : 'loading...'}</h1>
    </div>
  );
};
