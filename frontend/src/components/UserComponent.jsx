import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "./User";

export const UserComponent = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user)
            });
    }, [filter])

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
                {users.map(user => <User user={user} />) }
            </div>
        </div>
    );
}