const API_URL =
  "https://www.arbeitnow.com/api/job-board-api";

export const fetchJobs = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await response.json();

  return data.data;
};