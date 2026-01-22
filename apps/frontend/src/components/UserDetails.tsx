import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface UserDetailsProps {
  userId: string;
}

export function UserDetails({ userId }: UserDetailsProps) {
  const [viewingSeconds, setViewingSeconds] = useState(0);
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => usersApi.getUserById(userId),
    enabled: !!userId,
  });

  const toggleActiveMutation = useMutation({
    mutationFn: (id: string) => usersApi.toggleUserActive(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["user", id] });

      const previousUser = queryClient.getQueryData(["user", id]);

      queryClient.setQueryData(["user", id], (old: any) => {
        if (!old) return old;
        return { ...old, active: !old.active };
      });

      return { previousUser };
    },
    onError: (_err, id, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(["user", id], context.previousUser);
      }
    },
    onSettled: (_data, _error, id) => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  useEffect(() => {
    setViewingSeconds(0);
    const interval = setInterval(() => {
      setViewingSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [userId]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Failed to load user details</p>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Select a user to view details</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm font-medium text-muted-foreground">Name</div>
          <div className="text-lg">{user.name}</div>
        </div>

        <div>
          <div className="text-sm font-medium text-muted-foreground">Email</div>
          <div>{user.email}</div>
        </div>

        <div>
          <div className="text-sm font-medium text-muted-foreground">Role</div>
          <div className="mt-1">
            <Badge
              variant={
                user.role === "admin"
                  ? "default"
                  : user.role === "editor"
                    ? "secondary"
                    : "outline"
              }
            >
              {user.role}
            </Badge>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium text-muted-foreground">
            Status
          </div>
          <div className="mt-1">
            <Badge variant={user.active ? "default" : "destructive"}>
              {user.active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="text-sm text-muted-foreground mb-4">
            Viewing profile for {viewingSeconds} seconds
          </div>
          <Button
            onClick={() => toggleActiveMutation.mutate(user.id)}
            disabled={toggleActiveMutation.isPending}
            className="w-full"
          >
            {toggleActiveMutation.isPending ? "Toggling..." : "Toggle Active"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
