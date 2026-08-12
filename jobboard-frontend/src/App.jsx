import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import ProtectedRoute from "./components/ProtectedRoute";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import MyApplications from "./pages/MyApplications";
import JobApplications from "./pages/JobApplications";
import RecruiterApplications from "./pages/RecruiterApplications";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />


            <Route
                path="/jobs"
                element={
                    <ProtectedRoute>
                        <Jobs />
                    </ProtectedRoute>
                }
            />


          <Route
    path="/create-job"
    element={
        <ProtectedRoute allowedRoles={["RECRUITER"]}>
            <CreateJob />
        </ProtectedRoute>
    }
/>

<Route
    path="/edit-job/:id"
    element={
        <ProtectedRoute allowedRoles={["RECRUITER"]}>
            <EditJob />
        </ProtectedRoute>
    }
/>


            <Route
                path="/resume-analyzer"
                element={
                    <ProtectedRoute>
                        <ResumeAnalyzer />
                    </ProtectedRoute>
                }
            />


            <Route
                path="/my-applications"
                element={
                    <ProtectedRoute>
                        <MyApplications />
                    </ProtectedRoute>
                }
            />
            <Route
    path="/job-applications/:jobId"
    element={
        <ProtectedRoute>
            <JobApplications />
        </ProtectedRoute>
    }
/>
<Route
    path="/recruiter/applications/:jobId"
    element={
        <ProtectedRoute allowedRoles={["RECRUITER"]}>
            <RecruiterApplications />
        </ProtectedRoute>
    }
/>

        </Routes>
    );
}

export default App;