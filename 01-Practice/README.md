JOB PORTAL Notes

Features:
- Show jobs
- Search jobs
- View job details

Pages:
- HomePage
- JobDetailsPage

Components:
- SearchBar
- JobList
- JobCard

State:
HomePage
- jobs
- loading
- error
- searchTerm

Routes:
/ -> HomePage
/job/:slug -> JobDetailsPage

Flow:
Page Load
 ↓
Fetch Jobs
 ↓
Store in State
 ↓
Render Job Cards

Search Input
 ↓
Update searchTerm
 ↓
Filter jobs
 ↓
Update UI