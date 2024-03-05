import { Instance } from "../../lib/axios/axios.config";

const EventsService = {
  GetAll() {
    return Instance.get("/events");
  },
  getById(id) {
    return Instance.get(`/events/${id}`);
  },
};

export default EventsService;
