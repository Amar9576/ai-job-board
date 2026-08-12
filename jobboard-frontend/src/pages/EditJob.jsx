import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import jobService from "../services/jobService";

function EditJob() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [job, setJob] = useState({

        title: "",
        company: "",
        location: "",
        description: "",
        salary: ""

    });

    useEffect(() => {

        loadJob();

    }, []);

    const loadJob = async () => {

        try {

            const response = await jobService.getJobById(id);

            setJob(response.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load job.");

        }

    };

    const handleChange = (e) => {

        setJob({

            ...job,

            [e.target.name]: e.target.value

        });

    };

    const updateJob = async (e) => {

        e.preventDefault();

        try {

            await jobService.updateJob(id, job);

            alert("Job Updated Successfully");

            navigate("/jobs");

        } catch (error) {

            console.error(error);

            alert("Update Failed");

        }

    };

    return (

        <>
            <Navbar />

            <div style={{ width: "600px", margin: "30px auto" }}>

                <h2>Edit Job</h2>

                <form onSubmit={updateJob}>

                    <input
                        name="title"
                        value={job.title}
                        onChange={handleChange}
                    />

                    <br /><br />

                    <input
                        name="company"
                        value={job.company}
                        onChange={handleChange}
                    />

                    <br /><br />

                    <input
                        name="location"
                        value={job.location}
                        onChange={handleChange}
                    />

                    <br /><br />

                    <textarea
                        rows="6"
                        name="description"
                        value={job.description}
                        onChange={handleChange}
                    />

                    <br /><br />

                    <input
                        type="number"
                        name="salary"
                        value={job.salary}
                        onChange={handleChange}
                    />

                    <br /><br />

                    <button type="submit">

                        Update Job

                    </button>

                </form>

            </div>

        </>

    );

}

export default EditJob;