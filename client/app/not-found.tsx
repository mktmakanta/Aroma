import Link from 'next/link';

// Global not-found page component
const NotFound = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center p-5"
      style={{ backgroundImage: 'url("/images/not-found.jpg")' }}
    >
      <div className="absolute inset-0 bg-black opacity-65"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-lg p-8 rounded-lg bg-white shadow-xl transform transition duration-500 hover:scale-105 bg-opacity-80">
          <h1 className="text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-500 mb-6 animate__animated animate__fadeIn">
            404
          </h1>
          <p className="text-xl lg:text-3xl font-semibold mb-6 animate__animated animate__fadeIn animate__delay-1s text-gray-800">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/admin">
            <p className="inline-block text-lg py-2 md:py-3  px-4 md:px-6 rounded-full text-white bg-green-600 hover:bg-green-700 transition duration-300">
              Go Back to Home
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
