import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { jobService } from "../../services/job.service";

import { nrmlVisible } from "../../animations/animations";

interface Job {
  _id: string;
  title: string;
  location: string;
  description: string;
  applyCount?: number;
}

export default function ListingsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPopularJobs();
  }, []);

  const fetchPopularJobs = async () => {
    try {
      setLoading(true);

      const res = await jobService.getAllJobs();
      const allJobs: Job[] = res.data?.jobs || [];

      const topJobs = allJobs
        // .filter((j) => j.status === "OPEN")
        .sort((a, b) => (b.applyCount || 0) - (a.applyCount || 0))
        .slice(0, 3);

      setJobs(topJobs);
    } catch (err) {
      console.error("Failed to load popular jobs", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="js-listings-container" {...nrmlVisible(0.4)}>
      <h2 className="js-listings-heading">Popular Job Listings</h2>

      {loading && <p>Loading jobs...</p>}

      {!loading && jobs.length === 0 && <p>No jobs available</p>}

      <div className="js-listings-card-grid">
        {jobs.map((job) => (
          <div key={job._id} className="js-listings-job-card">
            <h3 className="js-listings-job-card-title">{job.title}</h3>

            <p className="js-listings-job-card-Locaion">{job.location}</p>
            {/* <p className="js-listings-job-card-Locaion">{job?.applyCount}</p> */}

            <p className="js-listings-job-card-describtion">
              {job.description.length > 180
                ? job.description.slice(0, 180) + "..."
                : job.description}
            </p>

            <button className="js-listings-job-card-button">
              View Details
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
