import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleCastError = (): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: "",
      message: "Invalid ID format",
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Invalid ID",
    errorSources,
  };
};

export default handleCastError;
