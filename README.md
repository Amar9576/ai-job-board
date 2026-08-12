# AI Job Board

A full-stack job portal that connects job seekers and recruiters through role-based authentication, job management, job applications, and AI-assisted job description generation.

## Features

- JWT-based authentication and authorization
- Role-based access for Job Seekers and Recruiters
- Recruiters can create, edit and delete job postings
- Job seekers can search and apply for jobs
- Prevent duplicate job applications
- Job seekers can view their applications and application status
- Recruiters can view applications for their jobs and update application status
- Pagination and job search
- AI-assisted job description generation
- RESTful backend APIs
- React-based frontend

## Tech Stack

### Backend
- Java
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA / Hibernate
- MySQL
- Maven

### Frontend
- React.js
- JavaScript
- Axios
- React Router
- HTML
- CSS

## Project Structure

```text
AI-Job-Board
├── jobboard-backend
│   └── Spring Boot REST API
│
├── jobboard-frontend
│   └── React Application
│
└── README.md

## Authentication

The application uses JWT-based authentication with Spring Security.

After successful login, the backend generates a JWT token. The frontend stores the token and uses it to access protected APIs.

### Roles

- `JOB_SEEKER`
- `RECRUITER`

## Job Seeker

- Browse available job postings
- Search jobs by title
- Apply for jobs
- Prevent duplicate applications
- View submitted applications
- Track application status

## Recruiter

- Create job postings
- Edit existing job postings
- Delete job postings
- View applications received for jobs
- Update application status
- Generate job descriptions using AI

## AI-Assisted Job Description Generation

The application uses AI to assist recruiters in generating job descriptions, helping reduce the time required to create job postings.

## Job Application Management

The application provides separate workflows for job seekers and recruiters.

### Job Seeker Workflow

1. Login as a Job Seeker
2. Browse available jobs
3. Apply for a job
4. View submitted applications
5. Track application status

### Recruiter Workflow

1. Login as a Recruiter
2. Create and manage job postings
3. View applications for their jobs
4. Update application status

## API

The backend exposes RESTful APIs for:

- Authentication
- Job management
- Job search
- Job applications
- Application status management
- AI-assisted job description generation

## Running the Project

### Backend

Navigate to:

```text
jobboard-backend
mvn spring-boot:run
http://localhost:8080

### Frontend

Navigate to:

```text
jobboard-frontend

npm install
npm run dev
http://localhost:5173

## Security

- JWT-based authentication for protected APIs
- Role-based authorization for Job Seekers and Recruiters
- Sensitive credentials are excluded from the repository

## Author

**Amar Kant Upadhyay**

GitHub: https://github.com/Amar9576