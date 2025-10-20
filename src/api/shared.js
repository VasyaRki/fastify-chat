/**
 * @param {unknown} error
 * @returns {string}
 */
export const getErrorMessage = (error) => {
  if (error instanceof Error) return error.message;
  return String(error);
};
