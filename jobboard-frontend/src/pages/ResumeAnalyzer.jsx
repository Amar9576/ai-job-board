import { useState } from "react";
import Navbar from "../components/Navbar";
import aiService from "../services/aiService";

function ResumeAnalyzer() {

    const [jobDescription, setJobDescription] = useState("");
    const [resume, setResume] = useState("");

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);


    const analyzeResume = async () => {

        if (jobDescription.trim() === "") {

            alert("Please enter the job description.");

            return;
        }


        if (resume.trim() === "") {

            alert("Please paste the resume.");

            return;
        }


        try {

            setLoading(true);

            const response =
                await aiService.analyzeResume(
                    jobDescription,
                    resume
                );

            setResult(response.data);

        } catch (error) {

            console.error(error);

            alert("Resume analysis failed.");

        } finally {

            setLoading(false);

        }

    };


    return (

        <>

            <Navbar />

            <div
                style={{
                    width: "80%",
                    margin: "30px auto"
                }}
            >

                <h1>AI Resume Analyzer</h1>

                <hr />


                {/* Job Description */}

                <h3>Job Description</h3>

                <textarea
                    rows="8"
                    style={{
                        width: "100%",
                        padding: "10px",
                        boxSizing: "border-box"
                    }}
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) =>
                        setJobDescription(e.target.value)
                    }
                />


                {/* Resume */}

                <h3>Candidate Resume</h3>

                <textarea
                    rows="12"
                    style={{
                        width: "100%",
                        padding: "10px",
                        boxSizing: "border-box"
                    }}
                    placeholder="Paste candidate resume here..."
                    value={resume}
                    onChange={(e) =>
                        setResume(e.target.value)
                    }
                />


                <br />
                <br />


                <button
                    onClick={analyzeResume}
                    disabled={loading}
                    style={{
                        padding: "10px 20px",
                        cursor: "pointer"
                    }}
                >

                    {loading
                        ? "Analyzing..."
                        : "Analyze Resume"
                    }

                </button>


                {/* Result */}

                {result && (

                    <div
                        style={{
                            marginTop: "30px",
                            padding: "20px",
                            border: "1px solid #ccc",
                            borderRadius: "8px"
                        }}
                    >

                        <h2>
                            Resume Analysis
                        </h2>


                        <h3>
                            Match Score:
                            {" "}
                            {result.score}%
                        </h3>


                        <p>
                            <b>Strengths:</b>
                        </p>

                        <p>
                            {result.strengths}
                        </p>


                        <p>
                            <b>Missing Skills:</b>
                        </p>

                        <p>
                            {result.missingSkills}
                        </p>


                        <p>
                            <b>Suggestion:</b>
                        </p>

                        <p>
                            {result.suggestion}
                        </p>

                    </div>

                )}

            </div>

        </>

    );
}

export default ResumeAnalyzer;