export const truncate = (str, len) => {
  if (str) {
    if (str.length > len) {
      return str.slice(0, len) + "...";
    } else return str;
  }

  return "";
};
