import { Link } from 'react-router-dom';

const DemoCard = ({ demo }) => {

  return (
    <Link
      to={`/demo/${demo.slug}`}
      className="block bg-white p-4 rounded shadow hover:shadow-lg transition"
    >
      <h3 className="text-lg font-semibold text-blue-700">{demo.title}</h3>
      <p className="text-sm text-gray-500 capitalize">{demo.type}</p>
      {typeof demo.qrCodeUrl === 'string' &&
        demo.qrCodeUrl.trim().startsWith('data:image') && (
          <div className="mt-3">
            <p className="text-xs text-gray-400 mb-1">Scan QR to view</p>
            <img
              src={demo.qrCodeUrl.trim()}
              alt="QR Code"
              className="w-24 h-24 object-contain mx-auto"
            />
          </div>
        )}




    </Link>
  );
};

export default DemoCard;
