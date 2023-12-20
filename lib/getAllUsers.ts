import axios from 'axios';

// Assuming the types are defined as provided in the question

export default async function getAllUsers(): Promise<User[]> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}users`);
    const { permissionResult, userResult }: { permissionResult: Permission[]; userResult: User[] } = res.data;

    const userMap: { [userId: string]: { role: string } } = {};

    // Create a map using userId as key
    permissionResult.forEach((permission) => {
      const userId = permission.userId.toString(); // Convert ObjectId to string
      if (!userMap[userId]) {
        userMap[userId] = { role: permission.role };
      }
    });

    // Map the role field to userResult
    userResult.forEach((user) => {
      const userId = user._id;
      const userIdStr = userId?.toString(); // Convert ObjectId to string
      if (userIdStr && userMap[userIdStr] && userMap[userIdStr].role) {
        user.role = userMap[userIdStr].role;
      }
    });
    return userResult;
  } catch (error) {
    // Handle errors appropriately (e.g., throw or log)
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}
