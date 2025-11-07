import { Table, TableBody } from "@/components/ui/table";
import { UserTableHeader } from "./UserTableHeader";
import { UserTableRow } from "./UserTableRow";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface UserTableProps {
  users: User[];
  sortField: "name" | "email" | "createdAt";
  sortOrder: "asc" | "desc";
  onSort: (field: "name" | "email" | "createdAt") => void;
  editingId: string | null;
  editName: string;
  onEditNameChange: (value: string) => void;
  onStartEdit: (id: string, name: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export function UserTable({
  users,
  sortField,
  sortOrder,
  onSort,
  editingId,
  editName,
  onEditNameChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  isUpdating,
  isDeleting,
}: UserTableProps) {
  return (
    <Table>
      <UserTableHeader
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={onSort}
      />
      <TableBody>
        {users.map((user) => (
          <UserTableRow
            key={user.id}
            user={user}
            isEditing={editingId === user.id}
            editName={editName}
            onEditNameChange={onEditNameChange}
            onStartEdit={onStartEdit}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onDelete={onDelete}
            isUpdating={isUpdating}
            isDeleting={isDeleting}
          />
        ))}
      </TableBody>
    </Table>
  );
}
