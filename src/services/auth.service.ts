import { AxiosResponse } from "axios";
import { axiosInstance } from "../lib/axios";

export const authService = {
  checkAuth: (): Promise<AxiosResponse<any>> => {
    const url = "/auth/check";
    return axiosInstance.get(url);
  },
};
