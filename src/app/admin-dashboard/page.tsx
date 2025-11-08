"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useUsers } from "@/lib/hooks/useUsers";
import { useUserEdit } from "@/lib/hooks/useUserEdit";
import { useUserSearchSort } from "@/lib/hooks/useUserSearchSort";
import { SearchInput } from "@/components/admin/SearchInput";
import { UserTable } from "@/components/admin/UserTable";
import { Alert } from "@/components/Alert";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const {
    users,
    loading,
    fetchUsers,
    deleteUser,
    updateUser,
    isUpdating,
    isDeleting,
    error,
  } = useUsers();
  const { editingId, editName, setEditName, startEdit, cancelEdit } =
    useUserEdit();
  const {
    searchTerm,
    setSearchTerm,
    sortField,
    sortOrder,
    handleSort,
    filteredUsers,
  } = useUserSearchSort(users);

  useEffect(() => {
    if (status === "authenticated" && session) {
      fetchUsers();
    }
  }, [status, session, fetchUsers]);

  const handleSaveEdit = async () => {
    if (!editingId || !editName) return;
    const result = await updateUser(editingId, editName);
    if (result.success) {
      cancelEdit();
    }
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Painel de Administração</h1>

      {error && (
        <div className="mb-4">
          <Alert message={error} type="error" />
        </div>
      )}

      <div className="mb-4 flex items-center space-x-4">
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
      </div>

      <UserTable
        users={filteredUsers}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
        editingId={editingId}
        editName={editName}
        onEditNameChange={setEditName}
        onStartEdit={startEdit}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={cancelEdit}
        onDelete={handleDelete}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
      />

      {filteredUsers.length === 0 && !loading && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum usuário encontrado.
        </div>
      )}
    </div>
  );
}
