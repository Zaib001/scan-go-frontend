import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDemoBySlug } from '../../services/demoService';
import DemoForm from '../../components/admin/DemoForm';

const DemoEditor = () => {
  const { slug } = useParams();
  const [demo, setDemo] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getDemoBySlug(slug);
      setDemo(res.data);
    })();
  }, [slug]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">✏️ Edit Demo</h2>
      {demo ? <DemoForm existingData={demo} /> : <p>Loading...</p>}
    </div>
  );
};

export default DemoEditor;
