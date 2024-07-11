import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { BottomWarning } from "../components/BottomWarning"
import diffFlowers from "../images/flowers.jpg";
import { useNavigate } from "react-router-dom"

export const Signin = () => {
    const navigate = useNavigate();
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
                        <InputBox placeholder="enter your email" label={"Email"} />
                        <InputBox placeholder="enter your password" label={"Password"} />
                        <div className="pt-4">
                            <Button onClick={async () => {
                                const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                    username,
                                    password
                                });
                                localStorage.setItem("token", response.data.token)
                                navigate("/dashboard")
                            }} label={"Sign in"} />
                        </div>
                        <BottomWarning label={"Don't have an account?"} linkText={"Sign up"} to={"/signup"} />
                    </div>
                </div>
            </div>
        </div>
    )
}