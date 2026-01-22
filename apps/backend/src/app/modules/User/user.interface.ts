export type TRole = "admin" | "editor" | "viewer";

export type TUser = {
  id: string;
  name: string;
  email: string;
  role: TRole;
  active: boolean;
  createdAt: Date;
};

export type TUserQuery = {
  search?: string;
  role?: TRole;
};
