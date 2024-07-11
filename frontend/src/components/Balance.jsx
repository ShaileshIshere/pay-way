export const Balance = ({ label }) => {
    return(
        <div className="flex mx-12 mt-4">
            <div className="cursor-default font-bold text-xl">
                Your balance
            </div>
            <div className="cursor-pointer font-semibold ml-4 text-lg">
                ₹ { label }
            </div>
        </div>
    );
}