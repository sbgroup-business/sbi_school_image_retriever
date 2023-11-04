const errorMiddleware = async (error, req, res, next) => {
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : 'Internal Server Error';

  console.error(error);

  return res.status(statusCode).json({ statusCode, message });
};

export default errorMiddleware;
