import { Prisma } from "@prisma/client";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handlePrismaError = (err: Prisma.PrismaClientKnownRequestError): TGenericErrorResponse => {
  let statusCode = 400;
  let message = "Database Error";
  let errorSources: TErrorSources = [];

  if (err.code === "P2002") {
    const fields = err.meta?.target as string[] || [];
    message = "Duplicate Value";
    errorSources = fields.map((field) => ({
      path: field,
      message: `${field} already exists`,
    }));
  }
  else if (err.code === "P2025") {
    statusCode = 404;
    message = "Record not found";
    errorSources = [
      {
        path: "",
        message: err.meta?.cause as string || "The requested record was not found",
      },
    ];
  }
  else if (err.code === "P2003") {
    message = "Foreign key constraint failed";
    errorSources = [
      {
        path: err.meta?.field_name as string || "",
        message: "Invalid reference",
      },
    ];
  }
  else if (err.code === "P2014") {
    message = "Invalid ID";
    errorSources = [
      {
        path: "",
        message: "The provided ID is invalid",
      },
    ];
  }
  else {
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handlePrismaError;
