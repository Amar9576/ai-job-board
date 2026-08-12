import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const storedRole = localStorage.getItem("role");

    const role = storedRole
        ? storedRole.toUpperCase().replace("ROLE_", "")
        : "";

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");

        navigate("/login");
    };

    return (

        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 30px",
                backgroundColor: "#1976d2",
                color: "white"
            }}
        >

            <h2 style={{ margin: 0 }}>
                AI Job Board
            </h2>

            <div
                style={{
                    display: "flex",
                    alignItems: "center"
                }}
            >

                <Link
                    to="/jobs"
                    style={{
                        color: "white",
                        marginRight: "20px",
                        textDecoration: "none"
                    }}
                >
                    Jobs
                </Link>


                {role === "JOB_SEEKER" && (
                    <>
                        <Link
                            to="/my-applications"
                            style={{
                                color: "white",
                                marginRight: "20px",
                                textDecoration: "none"
                            }}
                        >
                            My Applications
                        </Link>

                        <Link
                            to="/resume-analyzer"
                            style={{
                                color: "white",
                                marginRight: "20px",
                                textDecoration: "none"
                            }}
                        >
                            Resume Analyzer
                        </Link>
                    </>
                )}


                {role === "RECRUITER" && (
                    <Link
                        to="/create-job"
                        style={{
                            color: "white",
                            marginRight: "20px",
                            textDecoration: "none"
                        }}
                    >
                        Post Job
                    </Link>
                )}


                <button
                    onClick={logout}
                    style={{
                        padding: "8px 15px",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;