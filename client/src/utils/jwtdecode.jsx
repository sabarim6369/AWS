import { jwtDecode } from "jwt-decode";

const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token); 
    if (!decoded) {
      throw new Error("Invalid token");
    }
    const { adminId, databaseName } = decoded; 
    return { adminId, databaseName }; 
  } catch (error) {
    console.error("Error decoding token: ", error.message);
    return { adminId: null, databaseName: null }; 
  }
};
export default decodeToken;