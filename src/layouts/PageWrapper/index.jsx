import React from 'react';
import { useProfile } from '../../hooks/useProfile';
import { useHistory } from "react-router";
import axios from 'axios';

const PageWrapper = ({ children }) => {

    const { push } = useHistory();
    const { profile, loading } = useProfile();

    const logout = () => {
        axios.get("/logout")
        .then( data => {
            console.log({data})
            push("/login")
        })
    };
    
    return (
        <div>
            { loading ? (
                <p>loading . . .</p>
            ) : (
                <div>
                    <p>Welcome, { profile && profile.name }</p>
                    <button onClick={logout}>Logout</button>
                </div>

            )}
            
            { children }

        </div>
    )
}

export default PageWrapper;