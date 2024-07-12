import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const User = ({ user, userId }) => {
    const navigate = useNavigate();

    return(
        <div className="flex justify-between items-center h-full">
            <div className="flex items-center justify-center">
                <div className="bg-neutral-300 h-12 w-12 flex justify-center rounded-full mx-2 my-2">
                    <div className="cursor-default flex flex-col justify-center h-full text-xl font-bold">
                        { user.firstName.toUpperCase()[0] }
                    </div>
                </div>
                <div className="cursor-pointer flex flex-col justify-center h-ful font-medium text-lg mx-2">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <Button onClick={() => {
                    navigate(`/send?id=${user._id}&name=${user.firstName}`);
                }} label={"Send Money"}/>
            </div>
        </div>
    );
}