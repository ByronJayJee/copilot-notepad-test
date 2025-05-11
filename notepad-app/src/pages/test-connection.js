import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function TestConnection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('test_table').select('*');
      if (error) console.error(error);
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Test Connection</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
