import { User } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface UserListItemProps {
  user: User;
  isSelected: boolean;
  onClick: () => void;
}

export function UserListItem({ user, isSelected, onClick }: UserListItemProps) {
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "default";
      case "editor":
        return "secondary";
      case "viewer":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 border-b cursor-pointer hover:bg-accent transition-colors",
        isSelected && "bg-accent",
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="font-medium">{user.name}</div>
        <div className="flex gap-2 items-center">
          <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
          <Badge variant={user.active ? "default" : "destructive"}>
            {user.active ? "active" : "inactive"}
          </Badge>
        </div>
      </div>
    </div>
  );
}
