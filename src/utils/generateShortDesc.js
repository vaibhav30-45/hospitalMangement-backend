const generateShortDesc = (text, length = 150) => {
  if (!text) return "";

  return text.length > length
    ? text.substring(0, length).trim() + "..."
    : text;
};

export default generateShortDesc;
