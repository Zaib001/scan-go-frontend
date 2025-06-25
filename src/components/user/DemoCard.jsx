import { Link } from 'react-router-dom';

const DemoCard = ({ demo }) => {
  return (
    <div className="border rounded shadow-sm hover:shadow-md transition-all p-4">
      <h3 className="text-lg font-semibold text-blue-700">{demo.title}</h3>
      <p className="text-sm text-gray-500 capitalize">{demo.type}</p>
      {demo.mediaUrl && (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
          alt={demo.title}
          className="w-full h-auto object-cover mt-2 rounded"
        />
      )}
      <Link
        to={`/demo/${demo.slug}`}
        className="inline-block mt-3 text-blue-600 hover:underline"
      >
        View Demo →
      </Link>
    </div>
  );
};

export default DemoCard;
