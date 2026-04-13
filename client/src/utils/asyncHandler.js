// const asyncHandler = (fn) => {
//   return () => {
//     Promise.resolve(fn()).catch((err) => {
//       throw new Error(err)
//     });
//   };
// };

// export default asyncHandler;

const asyncHandler = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args); // ✅ return karo
    } catch (err) {
      throw err.response?.data || err.message;
    }
  };
};

export default asyncHandler;