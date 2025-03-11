export default function SearchSection({ search, setSearch }) {
    return (
      <header className="text-center py-20 bg-gradient-to-b from-white to-red-300">
        <h2 className="text-4xl font-extrabold">Find Your Ideal HDB Resale Flat</h2>
        <p className="mt-3 text-lg">Compare prices, analyze trends, and make informed decisions.</p>
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            className="p-3 w-80 border border-red-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Search by location, estate, or flat type"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-red-600 text-white px-6 py-3 rounded-r-lg hover:bg-red-700 transition">
            Search
          </button>
        </div>
      </header>
    );
  }
    