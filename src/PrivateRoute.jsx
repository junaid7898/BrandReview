import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
const PrivateRoute = ({ component: Component, type, role, ...rest }) => {
    const {client} = useSelector(state => state.client)
    // console.log(user.role)
    return (
      <Route
        {...rest}
        render={(props) =>
          (client && type && client.type === role) ? (
            <Redirect to='/' />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  };
  
  export default PrivateRoute;