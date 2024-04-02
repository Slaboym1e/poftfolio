import { createContext, useState } from "react";
import PropTypes from "prop-types";
import UsersService from "../../services/users/users";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const logout = async () => {
    await UsersService.logout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  const login = (user, token, refresh) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("refresh", refresh);
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export { AuthProvider };
