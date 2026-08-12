import axios from "../api/axiosConfig";

const getAllJobs = (page = 0, size = 5) => {
    return axios.get(`/jobs?page=${page}&size=${size}`);
};

const searchJobs = (keyword, page = 0, size = 5) => {
    return axios.get(
        `/jobs/search?keyword=${keyword}&page=${page}&size=${size}`
    );
};

const createJob = (job) => {
    return axios.post("/jobs", job);
};

const getJobById = (id) => {
    return axios.get(`/jobs/${id}`);
};

const updateJob = (id, job) => {
    return axios.put(`/jobs/${id}`, job);
};

const deleteJob = (id) => {
    return axios.delete(`/jobs/${id}`);
};

export default {
    getAllJobs,
    searchJobs,
    createJob,
    getJobById,
    updateJob,
    deleteJob
};