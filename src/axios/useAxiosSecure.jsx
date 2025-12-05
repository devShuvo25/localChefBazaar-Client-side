import axios from "axios";
import { useEffect } from "react";
import useAuth from "../hooks/authentication/useAuth";

export const axiosSecure = axios.create({
    baseURL: "http://localhost:3000/"
})
const useAxiosSecure =() => {
    const {user} = useAuth()
    // console.log(user);
    useEffect(() => {
        // console.log(user);
        const reqInterceptor = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })
        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
        }
    },[user])
    return {axiosSecure};
}
export default useAxiosSecure