import axios from "axios";

const API_URL =
    "http://localhost:8080/api/applications";

const getAuthHeaders = () => {

    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};


const getMyApplications = async () => {

    const userId =
        localStorage.getItem("userId");

    const response = await axios.get(
        `${API_URL}/user/${userId}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


const applyForJob = async (jobId) => {

    const userId =
        localStorage.getItem("userId");

    const response = await axios.post(
        `${API_URL}/apply`,
        null,
        {
            params: {
                jobId: jobId,
                userId: userId,
            },
            headers: getAuthHeaders(),
        }
    );

    return response.data;
};


const getApplicationsForJob = async (jobId) => {

    if (!jobId) {
        throw new Error("Job ID is missing");
    }

    const response = await axios.get(
        `${API_URL}/job/${jobId}`,
        {
            headers: getAuthHeaders(),
        }
    );

    return response.data;
};
const updateApplicationStatus = async (applicationId, status) => {

    const response = await axios.put(
        `${API_URL}/${applicationId}/status`,
        null,
        {
            params: {
                status: status
            },
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


const applicationService = {
    getMyApplications,
    applyForJob,
    getApplicationsForJob,
    updateApplicationStatus
};

export default applicationService;