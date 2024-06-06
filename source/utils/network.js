import axios from "axios";
const User = {
  createUser: async (uid, email, name) => {
    console.log("Creating User");
    try {
      const response = await axios.post(
        "http://expense-tracker-server-xi.vercel.app/api/v1/user/create_user",
        {
          uid,
          email,
          name,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

const Post = {
  createPost: async (data) => {
    console.log("Creating Post");
    try {
      const response = await axios.post(
        "http://expense-tracker-server-xi.vercel.app/api/v1/post/create_post",
        data
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  getAll: async () => {
    console.log("Getting All Posts");
    try {
      const response = await axios.get(
        "http://expense-tracker-server-xi.vercel.app/api/v1/post/get_posts"
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export { User, Post };
export default User;
