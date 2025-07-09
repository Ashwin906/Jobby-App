# Jobby App

Jobby App is a job listing web application built using React. It enables users to browse job opportunities, apply filters, and view detailed job descriptions. The app implements authentication, protected routes, API integration, and dynamic UI updates.

## Features

- **Authentication**
  - Login using username and password
  - Protected routes for authenticated users
  - Redirects based on authentication status

- **Job Listings**
  - Filter jobs by employment type and salary range
  - Search jobs by keywords
  - Displays loader while fetching data
  - Shows appropriate views for success, failure, and empty job lists

- **Job Details**
  - View detailed job information
  - Explore similar job recommendations
  - Visit company websites from job detail pages

- **Routing**
  - `/login` — Login page
  - `/` — Home page
  - `/jobs` — Job listings with filters
  - `/jobs/:id` — Job details
  - `*` — Not Found page

## Tech Stack

- React
- React Router
- JavaScript (ES6+)
- REST APIs
- JWT Authentication
- CSS for styling


## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/jobby-app.git
   cd jobby-app
