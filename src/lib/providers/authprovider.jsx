import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import UsersService from "../../services/users/users";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserFromStorage = () => {
      const user = localStorage.getItem("user");
      if (user !== null) setUser(JSON.parse(user));
    };

    getUserFromStorage();
  }, []);

  const logout = async () => {
    await UsersService.logout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const login = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
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
