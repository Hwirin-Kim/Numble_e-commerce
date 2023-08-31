export const createPageArr = (totalItems: number, itemsPerPage: number) => {
  let length = Math.ceil(totalItems / itemsPerPage);
  return Array.from({ length }, (_, index) => index + 1);
};
