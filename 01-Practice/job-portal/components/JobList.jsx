import JobCard from "./JobCard";

const JobList = ({ jobs }) => {
  return (
    <div className="job-grid">
      {jobs.map((job) => (
        <JobCard
          key={job.slug}
          job={job}
        />
      ))}
    </div>
  );
};

export default JobList;