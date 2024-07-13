import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { BottomWarning } from "../components/BottomWarning"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import diffFlowers from "../images/flowers.jpg"
import { useState } from "react"

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleSignin = async () => {
        try {
            const response = await axios.post("https://pay-way-api.vercel.app/api/v1/user/signin", {
                username,
                password
            })
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
        } 
        catch (error) {
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
    }

    return(
        <div className="flex w-full h-screen items-center justify-center bg-neutral-100">
            <div className="flex shadow-3xl overflow-hidden h-5/6 w-full max-w-5xl">
                <div className="hidden lg:flex h-full w-1/2">
                    <img src={diffFlowers} alt="Night Scene" className="w-full h-fit object-cover" />
                </div>
                <div className="w-full flex flex-col items-center justify-center lg:w-1/2 p-8 lg:p-12">
                    <div className="w-full">
                        <Heading label={"Welcome Back!"} />
                        <SubHeading label={"Enter your credentials to access your account"} />
                        <InputBox onChange={(event) => {
                            setUsername(event.target.value)
                        }} placeholder="enter your email" label={"Email"} />
                        <InputBox onChange={(event) => {
                            setPassword(event.target.value)
                        }} placeholder="enter your password" label={"Password"} />
                        <div className="pt-4">
                            <Button onClick={handleSignin} label={"Sign in"} />
                        </div>
                        <BottomWarning label={"Don't have an account?"} linkText={"Sign up"} to={"/signup"} />
                    </div>
                </div>
            </div>
        </div>
    )
}