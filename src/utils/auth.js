// utils/auth.js
export const getUserIdFromToken = () => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    if (!token) return null;
    
    try {
      // Decode the token (assuming it's a JWT)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId; // Adjust according to your token's structure
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };
  