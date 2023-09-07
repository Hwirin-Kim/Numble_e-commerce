export const checkCouponApplied = (data: string) => {
  let newData;
  if (data === "true") {
    newData = true;
  } else {
    newData = false;
  }
  return newData;
};
