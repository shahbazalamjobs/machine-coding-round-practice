import { createContext, useContext, useState } from "react";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <JobContext.Provider
      value={{
        jobs,
        setJobs,
        loading,
        setLoading,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);