import { Route, Redirect} from "react-router-dom";
import React from "react";

export const AuthRoute = ({ component: Component, token, ...props}) => {
    return (
        <Route render={() => (
            token === null ?  <Redirect to='/login' /> : <Component {...props} />
        )} />
    )
}
