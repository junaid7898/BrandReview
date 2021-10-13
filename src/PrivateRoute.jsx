import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
const PrivateRoute = ({ component: Component, type, role, ...rest }) => {
    const {user} = useSelector(state => state.user)
    // console.log(user.role)
    return (
      <Route
        {...rest}
        render={(props) =>
          (user && type && user.role === role) ? (
            <Redirect to='/' />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  };
  
  export default PrivateRoute;