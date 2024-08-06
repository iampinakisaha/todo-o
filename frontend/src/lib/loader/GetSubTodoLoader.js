import { GET_SUBTODO_ROUTE } from "@/utils/constants";
import apiClient from "../apiClient";

const getSubTodoLoader = async () => {
  try {
    const response = await apiClient.get(GET_SUBTODO_ROUTE, {
      withCredentials: true,
    });

    if (response.status === 201) {
      return response;
    } else {
      console.warn(`Unexpected status code: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Failed to load sub-todos:", error);
    return null;
  }
};

export default getSubTodoLoader;
