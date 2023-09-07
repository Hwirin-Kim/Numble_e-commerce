export const transformStringToArr = (str: string): number[] => {
  let arrData = [];
  if (str === "") {
    arrData = [2];
  } else {
    arrData = str.split(" ").map(Number);
  }
  return arrData;
};
