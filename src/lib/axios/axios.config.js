import axios from "axios";

export const Instance = axios.create({
  withCredentials: false,
  baseURL: "http://127.0.0.1:5001",
});

// создаем перехватчик запросов
// который к каждому запросу добавляет accessToken из localStorage
Instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
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
    console.log(originalRequest);
    originalRequest._isRetry = true;
    if (
      // проверим, что ошибка именно из-за невалидного accessToken
      error.response.status === 401 &&
      // проверим, что запрос не повторный
      error.config &&
      !error.config._isRetry &&
      originalRequest.url !== "/users/signin"
    ) {
      try {
        localStorage.setItem("token", localStorage.getItem("refresh_token"));
        // запрос на обновление токенов
        const resp = await Instance.post("/users/refresh");
        // сохраняем новый accessToken в localStorage
        localStorage.setItem("token", resp.data.access_token);
        localStorage.setItem("refresh_token", resp.data.refresh_token);
        // переотправляем запрос с обновленным accessToken
        return Instance.request(originalRequest);
      } catch (error) {
        console.log("AUTH ERROR");
      }
    }
    // на случай, если возникла другая ошибка (не связанная с авторизацией)
    // пробросим эту ошибку
    throw error;
  }
);
