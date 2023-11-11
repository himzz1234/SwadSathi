export const truncate = (str) => {
  if (str) {
    const length = str.length;
    return str.replace(str.slice(30, length), "...");
  }

  return "";
};
