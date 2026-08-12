import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import applicationService from "../services/applicationService";

function JobApplications() {

    const { jobId } = useParams();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, [jobId]);

    const fetchApplications = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await applicationService.getApplicationsForJob(jobId);

            setApplications(data);

        } catch (error) {

            console.error(
                "Error fetching applications:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load applications"
            );

        } finally {

            setLoading(false);
        }
    };

    const handleStatusChange = async (
        applicationId,
        newStatus
    ) => {

        try {

            setUpdatingId(applicationId);

            const updatedApplication =
                await applicationService.updateApplicationStatus(
                    applicationId,
                    newStatus
                );

            setApplications((previousApplications) =>
                previousApplications.map((application) =>
                    application.id === applicationId
                        ? {
                              ...application,
                              status: updatedApplication.status
                          }
                        : application
                )
            );

        } catch (error) {

            console.error(
                "Error updating application status:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update application status"
            );

        } finally {

            setUpdatingId(null);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    Job Applications
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
                            No applications received for this job yet.
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
                                        <th>Candidate</th>
                                        <th>Email</th>
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
                                                    {application.user?.firstName}
                                                    {" "}
                                                    {application.user?.lastName}
                                                </td>

                                                <td>
                                                    {application.user?.email ||
                                                        "N/A"}
                                                </td>

                                                <td>

                                                    <select
                                                        className="form-select"
                                                        value={
                                                            application.status
                                                        }
                                                        disabled={
                                                            updatingId ===
                                                            application.id
                                                        }
                                                        onChange={(e) =>
                                                            handleStatusChange(
                                                                application.id,
                                                                e.target.value
                                                            )
                                                        }
                                                    >

                                                        <option value="APPLIED">
                                                            APPLIED
                                                        </option>

                                                        <option value="SHORTLISTED">
                                                            SHORTLISTED
                                                        </option>

                                                        <option value="INTERVIEW">
                                                            INTERVIEW
                                                        </option>

                                                        <option value="SELECTED">
                                                            SELECTED
                                                        </option>

                                                        <option value="REJECTED">
                                                            REJECTED
                                                        </option>

                                                    </select>

                                                    {updatingId ===
                                                        application.id && (
                                                            <small className="text-muted">
                                                                Updating...
                                                            </small>
                                                        )}

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

export default JobApplications;