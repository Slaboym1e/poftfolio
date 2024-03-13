import { Instance } from "../../lib/axios/axios.config";

const EventsService = {
  async getAll() {
    const response = await Instance.get("/events");
    return response.data;
  },
  getById(id) {
    return Instance.get(`/events/${id}`);
  },
  async removeById(id) {
    //const response = await Instance.delete(`/events/e-${id}`);
    console.log(id);
    return true;
  },
  async create(title, description, startDate, endDate) {
    const event = await Instance.post("/events", {
      title: title,
      description: description,
      start_date: startDate,
      end_date: endDate,
    });
    return event.data;
  },
};

export default EventsService;
