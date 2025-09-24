import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-10 flex flex-col items-center border border-orange-100">
        <h1 className="text-5xl font-extrabold text-orange-500 mb-4 tracking-tight">
          404
        </h1>
        <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 mb-8 text-center">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          <br />
          Try navigating back to the dashboard.
        </p>
        <Link href="/admin" passHref>
          <span className="inline-block px-8 py-3 rounded-lg bg-orange-500 text-white font-semibold shadow hover:bg-orange-600 transition-all duration-200">
            Back to Dashboard
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
