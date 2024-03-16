import { Instance } from "../../lib/axios/axios.config";

const UsersService = {
  async getAll() {
    const response = await Instance.get("/users");
    return response.data;
  },
  async getById(id) {
    const response = await Instance.get(`/users/u-${id}`);
    return response.data;
  },
  async removeById(id) {
    const response = await Instance.delete(`/users/u-${id}`);
    return response;
  },
  async create(username, email, password, repassword) {
    const response = await Instance.post("/users/add", {
      username: username,
      email: email,
      password: password,
      repassword: repassword,
    });
    console.log(response.data);
    return response.data;
  },
  async getRoles(id) {
    const response = await Instance.get(`/users/u-${id}/roles`);
    return response.data;
  },
  async getRights(id) {
    const response = await Instance.get(`/users/u-${id}/rights`);
    return response.data;
  },
};

export default UsersService;
