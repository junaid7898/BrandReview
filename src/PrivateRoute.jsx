import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
const PrivateRoute = ({ component: Component, type, role, ...rest }) => {
    const {client} = useSelector(state => state.client)
    // console.log(user.role)
    console.log(client, type, role)
    return (
      <Route
        {...rest}
        render={(props) =>
          !client || type
          ?
            <Component {...props} />
          : 
            <Redirect to='/' />
        }
      />
    );
  };
  
  export default PrivateRoute;