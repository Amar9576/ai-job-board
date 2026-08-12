import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import applicationService from "../services/applicationService";

function RecruiterApplications() {

    const { jobId } = useParams();
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!jobId) {
            setError("Job ID is missing.");
            setLoading(false);
            return;
        }

        loadApplications();

    }, [jobId]);


    const loadApplications = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await applicationService.getApplicationsForJob(
                    jobId
                );

            setApplications(data);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to load applications"
            );

        } finally {

            setLoading(false);
        }
    };


    const handleStatusChange = async (
        applicationId,
        status
    ) => {

        try {

            await applicationService.updateApplicationStatus(
                applicationId,
                status
            );

            alert(
                `Application status updated to ${status}`
            );

            loadApplications();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to update application status"
            );
        }
    };


    return (
        <>
            <Navbar />

            <div
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                    padding: "30px 20px"
                }}
            >

                <button
                    onClick={() => navigate("/jobs")}
                    style={{
                        marginBottom: "20px",
                        padding: "9px 16px",
                        cursor: "pointer"
                    }}
                >
                    ← Back to Jobs
                </button>


                <h1>
                    Job Applications
                </h1>

                <p style={{ color: "#666" }}>
                    Applications for Job ID: {jobId}
                </p>


                {loading && (
                    <p>
                        Loading applications...
                    </p>
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
                            No applications received for this job.
                        </div>
                    )}


                {!loading &&
                    !error &&
                    applications.length > 0 && (

                        <div className="table-responsive">

                            <table
                                className="table table-bordered table-hover"
                            >

                                <thead className="table-dark">

                                    <tr>

                                        <th>#</th>

                                        <th>Job</th>

                                        <th>User ID</th>

                                        <th>Status</th>

                                        <th>Applied At</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {applications.map(
                                        (application, index) => (

                                            <tr
                                                key={
                                                    application.id
                                                }
                                            >

                                                <td>
                                                    {index + 1}
                                                </td>

                                                <td>
                                                    {
                                                        application.jobTitle ||
                                                        "N/A"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        application.userId ||
                                                        "N/A"
                                                    }
                                                </td>

                                                <td>

                                                    <select
                                                        value={
                                                            application.status
                                                        }
                                                        onChange={(e) =>
                                                            handleStatusChange(
                                                                application.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="form-select"
                                                    >

                                                        <option value="APPLIED">
                                                            APPLIED
                                                        </option>

                                                        <option value="SHORTLISTED">
                                                            SHORTLISTED
                                                        </option>

                                                        <option value="REJECTED">
                                                            REJECTED
                                                        </option>

                                                        <option value="HIRED">
                                                            HIRED
                                                        </option>

                                                    </select>

                                                </td>

                                                <td>
                                                    {
                                                        application.appliedAt
                                                            ? new Date(
                                                                application.appliedAt
                                                            ).toLocaleString()
                                                            : "N/A"
                                                    }
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

export default RecruiterApplications;