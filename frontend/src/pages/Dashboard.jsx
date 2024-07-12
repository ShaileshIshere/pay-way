import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { UserComponent } from "../components/UserComponent"

export const Dashboard = () => {

    return(
        <div className="">
            <Appbar />
            <Balance />
            <UserComponent />
        </div>
    )
}