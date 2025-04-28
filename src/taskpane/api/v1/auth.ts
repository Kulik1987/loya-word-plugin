import axios from "../instanceAxios";
import { AxiosResponse } from "axios";

export type requestAuthCheckAccessT = {
  // access: boolean;
  is_access: boolean;
  success: boolean;
  message: string;
};

const contract = {
  checkAccess: (email: string): Promise<AxiosResponse<requestAuthCheckAccessT>> => {
    return axios({
      url: `/speransky/v1/auth-b2b/check-access?email=${email}`,
      method: "get",
    });
  },
};

export default contract;
