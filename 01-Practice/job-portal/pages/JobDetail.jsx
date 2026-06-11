import { useParams } from "react-router-dom";
import { useJobContext } from "../context/JobContext";

const JobDetail = () => {
  const { slug } = useParams();

  const { jobs } = useJobContext();

  const job = jobs.find(
    (item) => item.slug === slug
  );

  if (!job) {
    return <h2>Job Not Found</h2>;
  }

  return (
    <div className="detail">
      <h1>{job.title}</h1>

      <h3>{job.company_name}</h3>

      <p>{job.location}</p>

      <div
        dangerouslySetInnerHTML={{
          __html: job.description,
        }}
      />
    </div>
  );
};

export default JobDetail;