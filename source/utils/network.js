import axios from "axios"
const User = {
    createUser: async (uid, email, name) => {
        console.log("Creating User")
        try {
            const response = await axios.post("http://expense-tracker-server-xi.vercel.app/api/v1/user/create_user", {
                uid,
                email,
                name
            })
            return response.data
        } catch (error) {
            console.error(error)
        }
        
    },
}
export default User
