export const truncate = (str) => {
  if (str) {
    const length = str.length;
    if (length > 20) {
      return str.slice(0, 20) + "...";
    } else return str;
  }

  return "";
};
