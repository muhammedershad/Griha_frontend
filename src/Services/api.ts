import axios from "./axios";
import response from "../interfaces/apiResponce";

const userExistsCheck = async (email: string): Promise<response> => {
    try {
      const response = await axios.get(`/api/user/check-user-email?email=${email}`);
      
      const userExists = response.data
      return userExists;
    } 
    catch (error) {
      console.error('Error checking user existence:', error);
      throw error; // You might want to handle this error more gracefully based on your use case
    }
  };

export default {
    userExistsCheck
}