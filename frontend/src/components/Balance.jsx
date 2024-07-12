import axios from "axios";
import { useEffect, useState } from "react";

export const Balance = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const handleBalance = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        }
        handleBalance();
    }, [balance])

    const formatBalance = (balance) => {
        return balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return(
        <div className="flex mx-12 mt-4">
            <div className="cursor-default font-bold text-xl">
                Your balance
            </div>
            <div className="cursor-pointer font-semibold ml-4 text-lg">
                ₹ { formatBalance(balance) }
            </div>
        </div>
    );
}