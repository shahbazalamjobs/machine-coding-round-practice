import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import JobDetail from "./pages/JobDetail";

import { JobProvider } from "./context/JobContext";
import useJobs from "./hooks/useJobs";
import "./App.css";

function AppContent() {
  useJobs();

  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/job/:slug"
        element={<JobDetail />}
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <JobProvider>
        <AppContent />
      </JobProvider>
    </BrowserRouter>
  );
}

export default App;