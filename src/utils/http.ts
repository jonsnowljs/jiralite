import qs from "qs";
import * as auth from "AuthProvider";
import { useAuth } from "context/AuthContext";
import { useCallback } from "react";

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

/**
 *
 * @param endpoint - endpoint of the http request
 * @param param1 - config object for the http request
 * @returns
 */
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const apiurl = process.env.REACT_APP_API_URL;
  console.log(apiurl);

  // method default is GET, customConfig can replace it
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  //axios can throw exception when the receive status code is not 2xx, fetch wouldn't throw exception

  return window
    .fetch(`${apiurl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "Please login again" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

/**
 * send http request when the user is authorized
 *
 * @returns callback http callback function
 */
export const useHttp = () => {
  const { user } = useAuth();
  // TS Utitlity Types: Parameters, typeof here is from TS. How to use Utility type: use generic type to pass in another type, and then utility  type  will make some operation on it

  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
