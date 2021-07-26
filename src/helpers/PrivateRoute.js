import Axios from "axios";
import React, {useState, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    // State
    const [authenticated, setAuthentication] = useState(null);
    const [loadingComplete, setLoadingComplete] = useState(false);
    // Login function
    useEffect(
        () => {
            // ComponentDidMount
            // Declare Function (you can also declare it outside the useEffect, 
            //    if you want to run it also if another prop changes for instance.
            //    But it will be overwritten on every rerender; 
            //    To prevent this you could use useCallback hook)
            const isLogin = async () => {
                try {
                    const result = await Axios.post("/api/users/getId");
                    // Store the result, e.g. ID, token, ...
                    setAuthentication(result.data);
                } catch (e) {
                    // Something failed
                    alert(e);
                }
                setLoadingComplete(true);
            }   
            // run login function
            isLogin();
        },
        []
    );
    if(loadingComplete){
        return (
            <Route {...rest} render={props => (
                authenticated !=='noid' ?
                    <Component {...props} />
                : <Redirect to="/login" />
            )} />
        );
    }else{
        return (null);
    }
};

export default PrivateRoute;