import axios from "axios";
import { useEffect, useState } from "react";

export const Appbar = () => {
    const [name, setName] = useState("");

    useEffect(() => {
        const handleName = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.put(
                    "https://pay-way-api.vercel.app/api/v1/user/update",
                    {}, // empty body since we're just fetching data
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setName(response.data.username);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        handleName();
    }, []);

    return(
        <div className="flex justify-between items-center space-between px-12 py-5 bg-neutral-200">
            <div className="cursor-pointer text-2xl subpixel-antialiased font-medium tracking-tight flex">
                <img src="/newFavicon.png" alt="falcon" style={{ width: '32px', height: '32px', marginRight: '10px' }} />
                Pay-Way
            </div>
            <div className="flex">
                <div className="cursor-default flex flex-col justify-center mr-3 text-xl subpixel-antialiased font-normal tracking-tight">
                    Hello { name }
                </div>
                <div className="bg-neutral-300 h-12 w-12 flex justify-center rounded-full">
                    <div className="cursor-default flex flex-col justify-center h-full text-xl font-bold">
                        { name ? name.toUpperCase()[0] : "" }
                    </div>
                </div>
            </div>
        </div>
    );
}