import { internalError } from "./response.utils.js";


const errorMiddleware = (err, __, res, _) => {
  return internalError(res, err.message || err.stack);
};

export default errorMiddleware;