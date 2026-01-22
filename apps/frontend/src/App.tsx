import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserListItem } from "@/components/UserListItem";
import { UserDetails } from "@/components/UserDetails";
import { CreateUserDialog } from "@/components/CreateUserDialog";
import { Role } from "@/types/user";
import { Search, ArrowUpDown } from "lucide-react";

function App() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "">("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [sortAscending, setSortAscending] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: users = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["users", debouncedSearch, roleFilter],
    queryFn: () =>
      usersApi.getUsers({
        search: debouncedSearch || undefined,
        role: roleFilter || undefined,
      }),
  });

  const displayedUsers = useMemo(() => {
    const sorted = [...users];
    sorted.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortAscending ? comparison : -comparison;
    });
    return sorted;
  }, [users, sortAscending]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <CreateUserDialog />
        </div>

        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as Role | "")}
            className="w-48"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </Select>
          <Button
            variant="outline"
            onClick={() => setSortAscending(!sortAscending)}
            disabled={isLoading || isFetching}
            className="gap-2"
          >
            <ArrowUpDown className="h-4 w-4" />
            Sort {sortAscending ? "↑" : "↓"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>Users List</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0">
              {isLoading ? (
                <div className="p-4 text-center text-muted-foreground">
                  Loading users...
                </div>
              ) : displayedUsers.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No users found
                </div>
              ) : (
                <div>
                  {displayedUsers.map((user) => (
                    <UserListItem
                      key={user.id}
                      user={user}
                      isSelected={selectedUserId === user.id}
                      onClick={() => setSelectedUserId(user.id)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="h-[600px]">
            {selectedUserId ? (
              <UserDetails userId={selectedUserId} />
            ) : (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>User Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Select a user from the list to view details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
