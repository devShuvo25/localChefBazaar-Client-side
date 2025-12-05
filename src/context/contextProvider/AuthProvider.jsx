
import { createUserWithEmailAndPassword, GoogleAuthProvider, 
    onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, 
    signOut, 
    updateProfile} from 'firebase/auth';

import { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase.config';
import { AuthContext } from '../AuthContext';
import { axiosSecure } from '../../axios/useAxiosSecure';
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [isLoading,setIsLoading] =useState(true);

    // signin with google
    const googleSignIn = () =>{
       return signInWithPopup(auth,googleProvider);
    }
    // sign in with email and password
    const createUser = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password);
    }
    // signin with email
    const logIn = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password);
    }
    // sign out
    const logout  = () => {
        return signOut(auth);
    }
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser,profile);
    }
    // state of user 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,currentUser => {
            if(currentUser){
                const token =  currentUser.getIdToken();
                axiosSecure.defaults.headers.common['Authorization'] = token;
            }
            setUser(currentUser)
            setIsLoading(false)
        })
        return ()  => unsubscribe();
    },[])


    const value ={
        googleSignIn,
        createUser,
        logIn,
        logout,
        setUser,
        user,
        isLoading,
        setIsLoading,
        updateUserProfile
        
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider