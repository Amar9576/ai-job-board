import API from "../api/axiosConfig";

const authService = {

    register(userData) {

        return API.post(
            "/auth/register",
            userData
        );
    },


    login(loginData) {

        return API.post(
            "/auth/login",
            loginData
        );
    },


    logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    },


    saveToken(token) {

        localStorage.setItem(
            "token",
            token
        );
    },


    getToken() {

        return localStorage.getItem("token");
    },


    getUserId() {

        return localStorage.getItem("userId");
    },


    isLoggedIn() {

        return !!localStorage.getItem("token");
    }
};

export default authService;