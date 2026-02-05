import { useEffect, useState } from "react";
import { companiesService } from "../../services/companies.service";
import { motion, AnimatePresence } from "framer-motion";

import {
  nrmlLeft,
  nrmlRight,
  nrmlScaleUp,
  nrmlVisible,
} from "../../animations/animations";

interface Company {
  _id: string;
  name: string;
  industry: string;
  website: string;
  location: string;
  isActive: boolean;
  createdAt: string;
}

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await companiesService.getAllCompanies();
      const data = res?.data?.companies || [];
      setCompanies(data);
    } catch (error) {
      console.error("Failed to fetch companies", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-div">
        <p className="loading-text"> Loading companies...</p>
      </div>
    );
  }

  return (
    <div className="js-c-page">
      <div className="js-c-container">
        <h2 className="js-c-title">All Listed Companies</h2>

        {companies.length === 0 ? (
          <p className="js-c-empty">No companies found.</p>
        ) : (
          <div className="js-c-grid">
            {companies.map((company, index) => (
              <motion.div
                key={company._id}
                className="js-c-card"
                {...nrmlVisible(0.1 * index)}
              >
                <h3 className="js-c-card-name">{company.name}</h3>

                <p className="js-c-card-text">Industry : {company.industry}</p>

                <p className="js-c-card-text">Location : {company.location}</p>

                <p className="js-c-card-text">
                  Status : {company.isActive ? "Active" : "Inactive"}
                </p>

                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="js-c-card-website"
                >
                  Visit Website
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
