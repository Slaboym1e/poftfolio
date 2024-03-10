import { Instance } from "../../lib/axios/axios.config";

const UsersService = {
  async getAll() {
    const response = await Instance.get("/roles");
    return response.data;
  },
  async getById(id) {
    const response = await Instance.get(`/roles/r-${id}`);
    return response.data;
  },
  async removeById(id) {
    const response = await Instance.delete(`/users/u-${id}`);
    return response;
  },
  async create(name) {
    const response = await Instance.post("/roles", {
      name: name,
    });
    console.log(response.data);
    return response.data;
  },
};

export default UsersService;
