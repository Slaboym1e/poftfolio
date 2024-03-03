import { Instance } from "../axios/axios.config";

const AuthService = {
  login(email, password) {
    return Instance.post("/users/signin", { email, password });
  },

  refreshToken() {
    return Instance.get("/users/refresh");
  },

  logout() {
    return Instance.post("/users/logout");
  },
};

export default AuthService;
