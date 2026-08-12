import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jobService from "../services/jobService";
import applicationService from "../services/applicationService";
import Navbar from "../components/Navbar";

function Jobs() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [keyword, setKeyword] = useState("");

    const role = localStorage.getItem("role");
    const [appliedJobIds, setAppliedJobIds] = useState([]);

useEffect(() => {

    loadJobs(page);

    if (role === "JOB_SEEKER") {
        loadMyApplications();
    }

}, [page]);

    const loadJobs = async (pageNumber) => {

        try {

            const response =
                await jobService.getAllJobs(pageNumber, 5);

            setJobs(response.data.content);
            setTotalPages(response.data.totalPages);

        } catch (error) {

            console.error(error);
            alert("Unable to load jobs.");

        }
    };

    const searchJob = async () => {

        try {

            const response =
                await jobService.searchJobs(
                    keyword,
                    0,
                    5
                );

            setJobs(response.data.content);
            setTotalPages(response.data.totalPages);
            setPage(0);

        } catch (error) {

            console.error(error);
            alert("Search failed.");

        }
    };

    const resetSearch = () => {

        setKeyword("");
        setPage(0);

    };

    const deleteJob = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this job?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await jobService.deleteJob(id);

            alert("Job deleted successfully.");

            loadJobs(page);

        } catch (error) {

            console.error(error);

            alert("Delete failed.");

        }
    };

  const applyForJob = async (jobId) => {

    try {

        await applicationService.applyForJob(jobId);

        setAppliedJobIds((previous) => [
            ...previous,
            jobId
        ]);

        alert("Application submitted successfully.");

    } catch (error) {

        console.error(error);

        alert(
            error.response?.data?.message ||
            "Unable to apply for this job."
        );
    }
};
    const loadMyApplications = async () => {

    try {

        const applications =
            await applicationService.getMyApplications();

        const jobIds =
            applications.map(
                (application) => application.jobId
            );

        setAppliedJobIds(jobIds);

    } catch (error) {

        console.error(
            "Unable to load applications:",
            error
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

                {/* Header */}

                <div
                    style={{
                        marginBottom: "25px"
                    }}
                >

                    <h1
                        style={{
                            marginBottom: "8px"
                        }}
                    >
                        Available Jobs
                    </h1>

                    <p
                        style={{
                            color: "#666",
                            margin: 0
                        }}
                    >
                        Find your next opportunity
                    </p>

                </div>


                {/* Search */}

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        marginBottom: "30px",
                        flexWrap: "wrap"
                    }}
                >

                    <input
                        type="text"
                        placeholder="Search jobs by title..."
                        value={keyword}
                        onChange={(e) =>
                            setKeyword(e.target.value)
                        }
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {
                                searchJob();
                            }

                        }}
                        style={{
                            flex: 1,
                            minWidth: "250px",
                            padding: "11px 14px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            fontSize: "15px"
                        }}
                    />

                    <button
                        onClick={searchJob}
                        style={{
                            padding: "11px 20px",
                            background: "#1976d2",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        Search
                    </button>

                    <button
                        onClick={resetSearch}
                        style={{
                            padding: "11px 20px",
                            background: "#6c757d",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        Reset
                    </button>

                </div>


                {/* Jobs */}

                {jobs.length === 0 ? (

                    <div
                        style={{
                            textAlign: "center",
                            padding: "50px",
                            border: "1px solid #ddd",
                            borderRadius: "8px"
                        }}
                    >

                        <h3>
                            No Jobs Found
                        </h3>

                        <p
                            style={{
                                color: "#666"
                            }}
                        >
                            Try searching with another keyword.
                        </p>

                    </div>

                ) : (

                    jobs.map((job) => (

                        <div
                            key={job.id}
                            style={{
                                background: "white",
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "22px",
                                marginBottom: "18px",
                                boxShadow:
                                    "0 2px 6px rgba(0,0,0,0.08)"
                            }}
                        >

                            <div>

                                <h2
                                    style={{
                                        marginTop: 0,
                                        marginBottom: "12px"
                                    }}
                                >
                                    {job.title}
                                </h2>

                                <p>
                                    <strong>
                                        Company:
                                    </strong>{" "}
                                    {job.company}
                                </p>

                                <p>
                                    <strong>
                                        Location:
                                    </strong>{" "}
                                    {job.location}
                                </p>

                                <p>
                                    <strong>
                                        Salary:
                                    </strong>{" "}
                                    ₹ {job.salary}
                                </p>

                                <p
                                    style={{
                                        lineHeight: "1.6",
                                        color: "#555"
                                    }}
                                >
                                    {job.description}
                                </p>

                            </div>


                            {/* Actions */}

                            <div
                                style={{
                                    marginTop: "20px",
                                    display: "flex",
                                    gap: "10px",
                                    flexWrap: "wrap"
                                }}
                            >

                                {/* JOB SEEKER */}

   {role === "JOB_SEEKER" && (
    <button
        onClick={() => applyForJob(job.id)}
        style={{
            padding: "10px 18px",
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
        }}
    >
        Apply Now
    </button>
)}


                                {/* RECRUITER */}
{role === "RECRUITER" && (
    <>

        <button
            onClick={() =>
                navigate(`/edit-job/${job.id}`)
            }
            style={{
                padding: "10px 18px",
                background: "#ffc107",
                color: "#000",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
            }}
        >
            Edit
        </button>


        <button
            onClick={() =>
                deleteJob(job.id)
            }
            style={{
                padding: "10px 18px",
                background: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
            }}
        >
            Delete
        </button>


        <button
            onClick={() => {

                if (!job.id) {
                    alert("Job ID is missing.");
                    return;
                }

                navigate(
                    `/recruiter/applications/${job.id}`
                );

            }}
            style={{
                padding: "10px 18px",
                background: "#198754",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
            }}
        >
            View Applications
        </button>

    </>
)}

                            </div>

                        </div>

                    ))
                )}


                {/* Pagination */}

                {totalPages > 1 && (

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "15px",
                            marginTop: "30px"
                        }}
                    >

                        <button
                            disabled={page === 0}
                            onClick={() =>
                                setPage(page - 1)
                            }
                            style={{
                                padding: "9px 18px",
                                cursor:
                                    page === 0
                                        ? "not-allowed"
                                        : "pointer"
                            }}
                        >
                            Previous
                        </button>

                        <span>
                            Page {page + 1} of {totalPages}
                        </span>

                        <button
                            disabled={
                                page + 1 >= totalPages
                            }
                            onClick={() =>
                                setPage(page + 1)
                            }
                            style={{
                                padding: "9px 18px",
                                cursor:
                                    page + 1 >= totalPages
                                        ? "not-allowed"
                                        : "pointer"
                            }}
                        >
                            Next
                        </button>

                    </div>

                )}

            </div>
        </>
    );
}

export default Jobs;