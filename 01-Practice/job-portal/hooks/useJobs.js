import { useEffect } from "react";
import { useJobContext } from "../context/JobContext";
import { fetchJobs } from "../services/api";

const useJobs = () => {
  const { setJobs, setLoading } = useJobContext();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);

        const data = await fetchJobs();

        setJobs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return null;
};

export default useJobs;