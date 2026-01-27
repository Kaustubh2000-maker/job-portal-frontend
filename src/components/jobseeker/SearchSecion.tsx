// export default function SearchSection() {
//   return (
//     <>
//       <div className="js-search-container">
//         <h2 className="js-search-heading">Find Your Dream Job Today</h2>
//         <p className="js-search-sub-text">
//           Explore thousands of opportunities from top companies and build your
//           carear
//         </p>
//         <div className="js-search-div">
//           <input
//             className="js-search-imput"
//             type="text"
//             placeholder="Search Job Title, Company or Keyword"
//           />
//           <button className="js-search-button">Search</button>
//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    jobs: any[];
    companies: any[];
  }>({ jobs: [], companies: [] });

  /* =========================
     LIVE SEARCH (DEBOUNCED)
  ========================= */
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults({ jobs: [], companies: [] });
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await api.get(`/search`, {
          params: { q: query },
        });

        setResults(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    }, 400); // debounce delay

    return () => clearTimeout(timer);
  }, [query]);

  /* =========================
     SUBMIT SEARCH (OPTIONAL)
  ========================= */
  const handleSearch = () => {
    if (!query.trim()) return;
    console.log("Final search:", results);
    // later: navigate to /search?q=query
  };

  return (
    <>
      <div className="js-search-container">
        <h2 className="js-search-heading">Find Your Dream Job Today</h2>
        <p className="js-search-sub-text">
          Explore thousands of opportunities from top companies and build your
          carear
        </p>

        <div className="js-search-div">
          <input
            className="js-search-imput"
            type="text"
            placeholder="Search Job Title, Company or Keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            className="js-search-button"
            onClick={handleSearch}
            disabled={loading}
          >
            {/* {loading ? "Searching..." : "Search"} */}
            search
          </button>
        </div>
      </div>
    </>
  );
}
