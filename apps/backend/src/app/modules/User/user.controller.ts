import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const getAllUsers = catchAsync(async (req, res) => {
  const { search, role } = req.query;

  const result = await UserService.getAllUsers({
    search: search as string,
    role: role as "admin" | "editor" | "viewer",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserService.getUserById(id);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "User not found",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const toggleUserActive = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserService.toggleUserActive(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status toggled successfully",
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getUserById,
  createUser,
  toggleUserActive,
};
