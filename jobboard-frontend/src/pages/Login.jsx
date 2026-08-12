import { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

  const handleSubmit = async (e) => {

    e.preventDefault();

  try {

    const response = await authService.login(form);

    console.log("LOGIN RESPONSE:", response.data);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.userId);
    localStorage.setItem("role", response.data.role);

    alert("Login Successful");

    navigate("/jobs");

} catch (error) {

    console.error("Login Error:", error);

    alert(
        error.response?.data?.message ||
        "Invalid Email or Password"
    );
}
    
};

    return (

        <div>

            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;