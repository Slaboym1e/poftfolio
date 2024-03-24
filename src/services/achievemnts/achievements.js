import { Instance } from "../../lib/axios/axios.config";

const AchieventService = {
  async add(id, eventId, title) {
    if (eventId === undefined || eventId < 1 || title === undefined)
      return false;
    const { status, data } = await Instance.post(
      `/users/u-${id}/achievements`,
      {
        eventId: eventId,
        title: title,
      }
    );
    if (status == 201) return data;
    return false;
  },
  async getAllByUserId(id) {
    const response = await Instance.get(`/users/u-${id}/achievements`);
    return response.data;
  },
};

export default AchieventService;
