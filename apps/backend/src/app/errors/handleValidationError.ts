import { TErrorSources, TGenericErrorResponse } from "../interface/error";
import { Prisma } from "@prisma/client";

const handleValidationError = (
  err: Prisma.PrismaClientValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: "",
      message: err.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleValidationError;
