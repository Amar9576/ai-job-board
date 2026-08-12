import axios from "../api/axiosConfig";

const generateJobDescription = (title) => {
    return axios.post(
        "/ai/generate-description",
        title,
        {
            headers: {
                "Content-Type": "text/plain"
            }
        }
    );
};

const analyzeResume = (jobDescription, resume) => {
    return axios.post(
        "/ai/analyze-resume",
        {
            jobDescription: jobDescription,
            resume: resume
        }
    );
};

export default {
    generateJobDescription,
    analyzeResume
};