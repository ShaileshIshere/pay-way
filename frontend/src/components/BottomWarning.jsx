import { Link } from "react-router-dom"

export const BottomWarning = ({ label, linkText, to}) => {
    return <div className="py-2 text-md mt-3 flex justify-center text-slate-500">
        <div>
            { label }
        </div>
        <Link className="pointer underline pl-1 cursor-pointer hover:text-black" to={to}>
            { linkText }
        </Link>
    </div>
}