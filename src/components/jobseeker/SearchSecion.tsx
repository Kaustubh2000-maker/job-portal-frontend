import { useEffect, useState } from "react";
import api from "../../services/api";

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    jobs: any[];
    companies: any[];
  }>({ jobs: [], companies: [] });

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
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = () => {
    if (!query.trim()) return;
    console.log("Final search:", results);
  };

  const handleJobClick = (id: string) => {
    console.log("JOB ID →", id);
    // later: navigate(`/jobs/${id}`)
  };

  const handleCompanyClick = (id: string) => {
    console.log("COMPANY ID →", id);
    // later: navigate(`/companies/${id}`)
  };

  const showResults =
    query.trim().length >= 2 &&
    (results.jobs.length > 0 || results.companies.length > 0);

  return (
    <>
      <div className="js-search-container">
        <h2 className="js-search-heading">Find Your Dream Job Today</h2>
        <p className="js-search-sub-text">
          Explore thousands of opportunities from top companies and build your
          career
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
            Search
          </button>
        </div>
      </div>

      {/* ================= RESULTS ================= */}
      {query.trim().length >= 2 && (
        <div className="js-search-results">
          {loading && <p className="js-search-searching">Searching...</p>}

          {!loading &&
            results.jobs.length === 0 &&
            results.companies.length === 0 && (
              <p className="js-search-empty">No results found</p>
            )}

          {showResults && (
            <div className="js-search-grid">
              {/* JOBS COLUMN */}
              {results.jobs.length > 0 && (
                <div className="js-search-col">
                  <h4 className="js-search-col-heading">Jobs</h4>

                  {results.jobs.map((job) => (
                    <div
                      key={job._id}
                      className="js-search-card"
                      data-id={job._id}
                      onClick={() => handleJobClick(job._id)}
                    >
                      <h5 className="js-search-card-title">
                        {job.title}{" "}
                        <span className="js-search-card-sub">
                          {job.location}
                        </span>
                      </h5>

                      {job.skills?.length > 0 && (
                        <div className="js-search-card-skills">
                          {job.skills
                            .slice(0, 4)
                            .map((s: string, i: number) => (
                              <span key={i} className="js-search-skill-chip">
                                {s}
                                {i < job.skills.slice(0, 4).length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* COMPANIES COLUMN */}
              {results.companies.length > 0 && (
                <div className="js-search-col">
                  <h4 className="js-search-col-heading">Companies</h4>

                  {results.companies.map((company) => (
                    <div
                      key={company._id}
                      className="js-search-card"
                      data-id={company._id}
                      onClick={() => handleCompanyClick(company._id)}
                    >
                      <h5 className="js-search-card-title">{company.name}</h5>
                      <p className="js-search-card-sub">
                        {company.location || company.industry}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
