export const formatDate = (data) => {
  const date = new Date(data);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = (date.getFullYear() + "").substring(2);
  return `${day}-${month}-${year}`;
};
