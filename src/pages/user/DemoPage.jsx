import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDemoBySlug } from '../../services/demoService';
import AudioPlayer from '../../components/user/AudioPlayer';
import ProposalForm from '../../components/user/ProposalForm';

const DemoPage = () => {
  const { slug } = useParams();
  const [demo, setDemo] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getDemoBySlug(slug);
      setDemo(res.data);
    })();
  }, [slug]);

  if (!demo) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 text-lg">
        Loading demo...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white to-slate-100 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">{demo.title}</h1>
        <p className="text-sm text-gray-500 capitalize mb-4">{demo.type}</p>

        {demo.productImage && (
          <div className="my-6">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Product Image</h3>
            <img
              src={`https://scan-go-backend.onrender.com${demo.productImage}`}
              alt="Product"
              className="w-full max-h-[400px] object-contain rounded-xl border border-gray-200 shadow"
            />
          </div>
        )}

        <div className="mt-6 text-gray-800 leading-relaxed whitespace-pre-line text-[15px]">
          {demo.content}
        </div>

        <div className="mt-10">
          <AudioPlayer text={demo.content} />
        </div>

        <div className="mt-8">
          <ProposalForm demoSlug={demo.slug} curatorKey={demo.curatorKey || 'default'} />
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
