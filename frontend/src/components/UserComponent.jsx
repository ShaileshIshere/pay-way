import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "./User";

export const UserComponent = () => {
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null); // State to hold logged-in user details

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`);
                setUsers(response.data.user);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchData();
      }, [filter]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("http://localhost:3000/api/v1/user/users", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []); // Fetch users once on component mount
    
    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("http://localhost:3000/api/v1/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setLoggedInUser(response.data); // Assuming response.data contains user information
            } catch (error) {
                console.error('Error fetching logged-in user:', error);
            }
        };
        fetchLoggedInUser();
    }, []); // Fetch logged-in user once on component mount
    // Filter out the currently signed-in user from the list
    const otherUsers = users.filter(user => user._id !== loggedInUser?._id);

    return(
        <div className="mx-12">
            <div className="font-medium my-5 text-lg cursor-default">
                Users
            </div>
            <div className="my-2">
                <input 
                    type="text" 
                    placeholder="search for users"
                    onChange={(event) => {
                        setFilter(event.target.value)
                    }}
                    className="w-full px-3 py-2 border-slate-200"
                />
            </div>
            <div>
                {otherUsers.map(user => <User key={user.id} user={user} />) }
            </div>
        </div>
    );
}