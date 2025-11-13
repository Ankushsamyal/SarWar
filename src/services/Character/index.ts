import axios from "axios";
import { API_ENDPOINTS } from "../../constant/apiConstant";

export const getCharacter = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.GET_CHARACTER);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
