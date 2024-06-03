import axios from "axios";

const IP = "http://192.168.0.105:3000";
const User = {
  createUser: async (uid, email, name) => {
    try {
      const response = await axios.post(IP + "/api/v1/user/create_user", {
        uid,
        email,
        name,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
export default User;
