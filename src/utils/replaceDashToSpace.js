export const replaceDashToSpace = (str) => {
  return str.replace(/-/g, " ");
};
export const replaceSpaceToUnderScore = (str) => {
  return str
    .replace(/^(?:\d+\.?|\d+\.\s+)/, "_")
    .replace(/(^\W+|\W+$)/g, "")
    .replace(/[^a-zA-Z0-9]/g, "_");
};

export const replaceSpecialChars = (str) => {
  return (
    str
      // Thay thế ký tự đặc biệt ở đầu hoặc cuối câu bằng chuỗi rỗng
      .replace(/^[^\w\s]+|[^\w\s]+$/g, "")
      .replace(/^[^\w\s]+|[^\w\s].*$/, "")
  );
};
