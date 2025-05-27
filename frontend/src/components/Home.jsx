import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-6 min-h-screen bg-beige flex items-center">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-black mb-4">
          Welcome to JAR.io
        </h1>
        <p className="text-dusky text-xl mb-8">
          A special place to cherish our memories, mark our favorite spots, and
          chat with a virtual friend. Made with love for our anniversary.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/scrapbook"
            className="bg-white p-6 rounded-lg shadow-md hover:bg-dusky hover:text-white transition"
          >
            <h2 className="text-2xl font-bold text-black">Scrapbook</h2>
            <p className="text-dusky mt-2">Relive our cherished moments.</p>
          </Link>
          <Link
            to="/map"
            className="bg-white p-6 rounded-lg shadow-md hover:bg-dusky hover:text-white transition"
          >
            <h2 className="text-2xl font-bold text-black">Map</h2>
            <p className="text-dusky mt-2">Pin our special places.</p>
          </Link>
          <Link
            to="/companion"
            className="bg-white p-6 rounded-lg shadow-md hover:bg-dusky hover:text-white transition"
          >
            <h2 className="text-2xl font-bold text-black">Companion</h2>
            <p className="text-dusky mt-2">Chat with a virtual friend.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
