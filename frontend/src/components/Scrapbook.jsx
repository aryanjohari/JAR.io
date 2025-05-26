import React, { useState, useEffect } from "react";
import axios from "axios";

const Scrapbook = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ text: "", photo: "", date: "" });
  const [error, setError] = useState("");
  const apiBaseUrl = "http://127.0.0.1:3000"; // Replace with API Gateway URL for production

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/scrapbook/list`);
      setEntries(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch entries");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEntry.text || !newEntry.date) {
      setError("Text and date are required");
      return;
    }

    try {
      await axios.post(`${apiBaseUrl}/scrapbook/create`, newEntry);
      setNewEntry({ text: "", photo: "", date: "" });
      setError("");
      fetchEntries();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save entry");
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen bg-beige p-6 ">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-black">JAR.io Scrapbook</h1>
        <p className="text-dusky mt-2">A place for our cherished memories</p>
      </header>
      <main className="max-w-4xl mx-auto">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <div className="mb-4">
            <label className="block text-dusky mb-2" htmlFor="text">
              Memory
            </label>
            <textarea
              id="text"
              className="w-full p-2 border border-dusky rounded text-dusky"
              rows="4"
              placeholder="Share a memory..."
              value={newEntry.text}
              onChange={(e) =>
                setNewEntry({ ...newEntry, text: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-dusky mb-2" htmlFor="photo">
              Photo URL (optional)
            </label>
            <input
              id="photo"
              type="url"
              className="w-full p-2 border border-dusky rounded text-dusky"
              placeholder="https://example.com/photo.jpg"
              value={newEntry.photo}
              onChange={(e) =>
                setNewEntry({ ...newEntry, photo: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-dusky mb-2" htmlFor="date">
              Date
            </label>
            <input
              id="date"
              type="date"
              className="w-full p-2 border border-dusky rounded text-dusky"
              value={newEntry.date}
              onChange={(e) =>
                setNewEntry({ ...newEntry, date: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="bg-dusky text-white px-6 py-2 rounded hover:bg-black transition"
          >
            Add Memory
          </button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {entries.map((entry) => (
            <div key={entry.SK} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-dusky mb-2">{entry.text}</p>
              {entry.photo && (
                <img
                  src={entry.photo}
                  alt="Memory"
                  className="w-full h-48 object-cover rounded mb-2"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
              <p className="text-sm text-gray-500">{entry.date}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Scrapbook;
