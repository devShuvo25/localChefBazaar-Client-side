import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext";


const useAuth = () => {
    const authValues = useContext(AuthContext);
    return authValues
}
export default useAuth;