import { useState, useCallback } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = async (id: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const updateUser = async (id: string, name: string) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUsers((prev) =>
          prev.map((user) => (user.id === id ? updatedUser : user))
        );
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    users,
    loading,
    fetchUsers,
    deleteUser,
    updateUser,
    isUpdating,
    isDeleting,
  };
}
