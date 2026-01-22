import prisma from "../../config/prisma";
import { TUserQuery } from "./user.interface";

const getAllUsers = async (query: TUserQuery) => {
  const { search, role } = query;

  const whereClause: any = {};

  if (search) {
    whereClause.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  if (role) {
    whereClause.role = role;
  }

  const users = await prisma.user.findMany({
    where: whereClause,
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

const createUser = async (userData: {
  name: string;
  email: string;
  role?: "admin" | "editor" | "viewer";
  active?: boolean;
}) => {
  const user = await prisma.user.create({
    data: userData,
  });

  return user;
};

const toggleUserActive = async (id: string) => {
  const currentUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!currentUser) {
    throw new Error("User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      active: !currentUser.active,
    },
  });

  return updatedUser;
};

export const UserService = {
  getAllUsers,
  getUserById,
  createUser,
  toggleUserActive,
};
