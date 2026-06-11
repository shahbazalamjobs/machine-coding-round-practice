import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="card">
      <h3>{job.title}</h3>

      <p>{job.company_name}</p>

      <p>{job.location}</p>

      <Link to={`/job/${job.slug}`}>
        View Details
      </Link>
    </div>
  );
};

export default JobCard;