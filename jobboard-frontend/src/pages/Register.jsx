import { useState } from "react";
import authService from "../services/authService";

function Register() {

    const [formData, setFormData] = useState({

        firstName: "",

        lastName: "",

        email: "",

        password: "",

        role: "JOB_SEEKER"

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await authService.register(formData);

            alert("Registration Successful");

            console.log(response.data);

        }

        catch (error) {

            console.log(error);

            if (error.response) {

                alert(JSON.stringify(error.response.data));

            }

            else {

                alert("Server Error");

            }

        }

    };

    return (

        <div style={{ width: "400px", margin: "40px auto" }}>

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <input

                    type="text"

                    name="firstName"

                    placeholder="First Name"

                    value={formData.firstName}

                    onChange={handleChange}

                />

                <br /><br />

                <input

                    type="text"

                    name="lastName"

                    placeholder="Last Name"

                    value={formData.lastName}

                    onChange={handleChange}

                />

                <br /><br />

                <input

                    type="email"

                    name="email"

                    placeholder="Email"

                    value={formData.email}

                    onChange={handleChange}

                />

                <br /><br />

                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    value={formData.password}

                    onChange={handleChange}

                />

                <br /><br />

                <select

                    name="role"

                    value={formData.role}

                    onChange={handleChange}

                >

                    <option value="JOB_SEEKER">

                        Job Seeker

                    </option>

                    <option value="RECRUITER">

                        Recruiter

                    </option>

                </select>

                <br /><br />

                <button type="submit">

                    Register

                </button>

            </form>

        </div>

    );
}

export default Register;