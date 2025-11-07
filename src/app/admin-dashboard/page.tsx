"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUsers } from "@/lib/hooks/useUsers";
import { useUserEdit } from "@/lib/hooks/useUserEdit";
import { useUserSearchSort } from "@/lib/hooks/useUserSearchSort";
import { SearchInput } from "@/components/admin/SearchInput";
import { UserTable } from "@/components/admin/UserTable";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    users,
    loading,
    fetchUsers,
    deleteUser,
    updateUser,
    isUpdating,
    isDeleting,
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
    if (status === "loading") return;
    if (!session || session.user.role !== "ADMIN") {
      router.push("/");
      return;
    }
    fetchUsers();
  }, [session, status, router, fetchUsers]);

  const handleSaveEdit = async () => {
    if (!editingId || !editName) return;
    await updateUser(editingId, editName);
    cancelEdit();
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Carregando...
      </div>
    );
  }

  if (!session || session.user.role !== "ADMIN") {
    return (
      <div className="flex justify-center items-center h-screen">
        Acesso Negado
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Painel de Administração</h1>

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
        onDelete={deleteUser}
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
