import axios from "axios";

export const Instance = axios.create({
  withCredentials: false,
  baseURL: "http://127.0.0.1:5001",
});

// создаем перехватчик запросов
// который к каждому запросу добавляет accessToken из localStorage
Instance.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return config;
});

// создаем перехватчик ответов
// который в случае невалидного accessToken попытается его обновить
// и переотправить запрос с обновленным accessToken
Instance.interceptors.response.use(
  // в случае валидного accessToken ничего не делаем:
  (config) => {
    return config;
  },
  // в случае просроченного accessToken пытаемся его обновить:
  async (error) => {
    // предотвращаем зацикленный запрос, добавляя свойство _isRetry
    const originalRequest = { ...error.config };
    originalRequest._isRetry = true;
    console.log(error.config.url);
    if (
      // проверим, что ошибка именно из-за невалидного accessToken
      error.response.status === 401 &&
      // проверим, что запрос не повторный
      error.config &&
      !error.config._isRetry &&
      error.config.url !== "/users/signin"
    ) {
      try {
        // запрос на обновление токенов
        const resp = await Instance.get("/users/refresh");
        // сохраняем новый accessToken в localStorage
        localStorage.setItem("token", resp.data.access_token);
        // переотправляем запрос с обновленным accessToken
        return Instance.request(originalRequest);
      } catch (error) {
        console.log("AUTH ERROR");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
    // на случай, если возникла другая ошибка (не связанная с авторизацией)
    // пробросим эту ошибку
    throw error;
  }
);
