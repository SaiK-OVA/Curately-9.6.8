import { useEffect } from "react"
import { useAuth } from "../../shared/services/auth/validating";
import { useNavigate } from "react-router-dom";
import { ContinuousLoader } from "../shared/ContinuousLoader/ContinuousLoader";

const Logout = () => {

    let navigate = useNavigate();
    let auth = useAuth();
    useEffect(() => {
        auth.signOut(() => {
            navigate("/#/login");
        })
    })


    return <div>
        <ContinuousLoader />
    </div>
}

export default Logout;