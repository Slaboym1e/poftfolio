import { Instance } from "../../lib/axios/axios.config";

const UsersService = {
  async getAll() {
    const response = await Instance.get("/users");
    return response.data;
  },
  async getById(id) {
    const response = await Instance.get(`/users/${id}`);
    return response.data;
  },
};

export default UsersService;
