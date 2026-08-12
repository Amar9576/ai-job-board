import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import jobService from "../services/jobService";
import aiService from "../services/aiService";

function CreateJob() {

    const navigate = useNavigate();

    const [loadingAI, setLoadingAI] = useState(false);

    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        description: "",
        salary: ""
    });

    const handleChange = (e) => {

        setJob({
            ...job,
            [e.target.name]: e.target.value
        });

    };

    const generateDescription = async () => {

        if (job.title.trim() === "") {

            alert("Please enter Job Title first.");

            return;
        }

        try {

            setLoadingAI(true);

            const response = await aiService.generateDescription(job.title);

            setJob({
                ...job,
                description: response.data.description
            });

        } catch (error) {

            console.error(error);

            alert("AI failed to generate description.");

        } finally {

            setLoadingAI(false);

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await jobService.createJob(job);

            alert("Job Posted Successfully");

            navigate("/jobs");

        } catch (error) {

            console.error(error);

            alert("Failed to create Job");

        }

    };

    return (

        <>

            <Navbar />

            <div
                style={{
                    width: "650px",
                    margin: "30px auto"
                }}
            >

                <h2>Create New Job</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="title"
                        placeholder="Job Title"
                        value={job.title}
                        onChange={handleChange}
                        required
                    />

                    <br /><br />

                    <input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={job.company}
                        onChange={handleChange}
                        required
                    />

                    <br /><br />

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={job.location}
                        onChange={handleChange}
                        required
                    />

                    <br /><br />

                    <button
                        type="button"
                        onClick={generateDescription}
                    >

                        {
                            loadingAI
                                ? "Generating..."
                                : "✨ Generate Description with AI"
                        }

                    </button>

                    <br /><br />

                    <textarea
                        rows="8"
                        cols="70"
                        name="description"
                        placeholder="Job Description"
                        value={job.description}
                        onChange={handleChange}
                        required
                    />

                    <br /><br />

                    <input
                        type="number"
                        name="salary"
                        placeholder="Salary"
                        value={job.salary}
                        onChange={handleChange}
                        required
                    />

                    <br /><br />

                    <button type="submit">

                        Post Job

                    </button>

                </form>

            </div>

        </>

    );

}

export default CreateJob;