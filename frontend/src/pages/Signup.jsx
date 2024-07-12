import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { BottomWarning } from "../components/BottomWarning"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import flowers from "../images/lotuses.jpg"
import axios from "axios"

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            // console.log("Attempting to sign up");
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password
            });
            // console.log("Signup successful", response.data.token);
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error("Error response", error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                console.error("Error request", error.request);
            } else {
                // Something else happened while setting up the request
                console.error("Error message", error.message);
            }
        }
    };

    return(
        <div className="flex w-full h-screen items-center justify-center bg-neutral-100">
            <div className="flex shadow-3xl overflow-hidden h-5/6 w-full max-w-5xl">
                <div className="w-full flex flex-col items-center justify-center lg:w-1/2 p-8 lg:p-12">
                    <div className="w-full">
                        <Heading label={"New Here?"} />
                        <SubHeading label={"Enter your information to create an account"} />
                        <InputBox onChange={(e) => {
                            setFirstName(e.target.value)
                        }} label={"First Name"} placeholder={"Enter your first name"} />
                        <InputBox onChange={(e) => {
                            setLastName(e.target.value)
                        }} label={"Last Name"} placeholder={"Enter your last name"} />
                        <InputBox onChange={(e) => {
                            setUsername(e.target.value)
                        }} label={"Email"} placeholder={"Enter your email"} />
                        <InputBox onChange={(e) => {
                            setPassword(e.target.value)
                        }} label={"Password"} placeholder={"Enter your password"} />
                        <Button onClick={handleSignup} label={"Sign up"} />
                        <BottomWarning label={"Already have an account? "} linkText={"Sign in"} to={"/signin"} />
                    </div>
                </div>
                <div className="hidden lg:flex h-full w-1/2">
                    <img src={flowers} alt="Night Scene" className="w-full h-fit object-cover" />
                </div>
            </div>
        </div>
    );
}