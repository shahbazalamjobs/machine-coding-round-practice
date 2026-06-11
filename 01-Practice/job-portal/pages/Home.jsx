import { useMemo, useState } from "react";
import { useJobContext } from "../context/JobContext";

import SearchBar from "../components/SearchBar";
import JobList from "../components/JobList";
import Loader from "../components/Loader";

const Home = () => {
  const { jobs, loading } = useJobContext();

  const [search, setSearch] = useState("");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) =>
      job.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [jobs, search]);

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Job Portal</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <JobList jobs={filteredJobs} />
    </div>
  );
};

export default Home;