import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import applicationService from "../services/applicationService";

function MyApplications() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await applicationService.getMyApplications();

            console.log("MY APPLICATIONS RESPONSE:", data);

            setApplications(data);

        } catch (error) {

            console.error(
                "Error fetching applications:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to load applications"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    My Applications
                </h2>

                {loading && (
                    <div className="text-center">
                        <p>Loading applications...</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {!loading &&
                    !error &&
                    applications.length === 0 && (

                        <div className="alert alert-info">
                            You have not applied for any jobs yet.
                        </div>
                    )}

                {!loading &&
                    !error &&
                    applications.length > 0 && (

                        <div className="table-responsive">

                            <table className="table table-bordered table-hover">

                                <thead className="table-dark">

                                    <tr>
                                        <th>#</th>
                                        <th>Job</th>
                                        <th>Job ID</th>
                                        <th>Status</th>
                                        <th>Applied At</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {applications.map(
                                        (application, index) => (

                                            <tr
                                                key={application.id}
                                            >

                                                <td>
                                                    {index + 1}
                                                </td>

                                                <td>
                                                    {application.jobTitle ||
                                                        "N/A"}
                                                </td>

                                                <td>
                                                    {application.jobId ||
                                                        "N/A"}
                                                </td>

                                                <td>

                                                    <span
                                                        className={
                                                            application.status ===
                                                            "APPLIED"
                                                                ? "badge bg-primary"
                                                                : application.status ===
                                                                  "SHORTLISTED"
                                                                ? "badge bg-warning text-dark"
                                                                : application.status ===
                                                                  "INTERVIEW"
                                                                ? "badge bg-info text-dark"
                                                                : application.status ===
                                                                  "SELECTED"
                                                                ? "badge bg-success"
                                                                : application.status ===
                                                                  "REJECTED"
                                                                ? "badge bg-danger"
                                                                : "badge bg-secondary"
                                                        }
                                                    >
                                                        {
                                                            application.status
                                                        }
                                                    </span>

                                                </td>

                                                <td>
                                                    {application.appliedAt
                                                        ? new Date(
                                                              application.appliedAt
                                                          ).toLocaleString()
                                                        : "N/A"}
                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>
                    )}

            </div>
        </>
    );
}

export default MyApplications;