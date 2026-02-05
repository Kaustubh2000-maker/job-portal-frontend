import { useEffect, useState } from "react";
import api from "../../services/api";

import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  nrmlLeft,
  nrmlRight,
  nrmlScaleUp,
  nrmlVisible,
} from "../../animations/animations";

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    jobs: any[];
    companies: any[];
  }>({ jobs: [], companies: [] });

  const navigate = useNavigate();

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
    navigate("/jobseeker/dashboard/jobs", {
      state: { selectedJobId: id },
    });
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
        <motion.h2 className="js-search-heading" {...nrmlScaleUp(0.2)}>
          Find Your Dream Job Today
        </motion.h2>
        <motion.p className="js-search-sub-text" {...nrmlScaleUp(0.3)}>
          Explore thousands of opportunities from top companies and build your
          career
        </motion.p>

        <motion.div className="js-search-div" {...nrmlScaleUp(0.4)}>
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
        </motion.div>
      </div>

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
