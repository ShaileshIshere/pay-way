import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import Nature from "../images/LandingPage.jpg";

export const LandingPage = () => {
    const navigate = useNavigate();

    return( 
        <div className="relative w-screen h-screen overflow-hidden">
            <div className="absolute inset-1/4 right-1/4 transform translate-y-1/5 transform translate-x-1/4 flex flex-col items-center justify-center space-y-4 z-10 rounded-lg shadow-3xl max-sm:w-auto h-auto">
                <h1 className="text-neutral-400 md:text-7xl max-sm:text-4xl font-bold">PAY-WAY</h1>
                <p className="px-12 py-5 text-gray-400 max-sm:text-sm">
                "PAY-WAY" isn't just an app—it's your passport to effortless financial transactions. Whether you're sending money to a friend overseas or getting paid by local clients, PAY-WAY guarantees a secure and seamless experience. Its sleek interface puts control at your fingertips, enabling you to manage transactions, track balances, and split bills with unparalleled ease. Powered by state-of-the-art encryption, PAY-WAY keeps your financial data safe and sound, ensuring peace of mind with every transaction. Discover the new standard in digital payments—where convenience meets reliability, empowering individuals and businesses to navigate their finances with absolute confidence.
                </p>
                <div className="flex space-x-2 w-60">
                    <Button label={"Sign up"} onClick={() => navigate("/signup")} />
                    <Button label={"Sign in"} onClick={() => navigate("/signin")} />
                </div>
            </div>
            <img src={Nature} className="w-full h-full object-cover" alt="Nature" />
        </div>
    );
}