import { Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const token = Cookies.get("access_token");

  return token ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

