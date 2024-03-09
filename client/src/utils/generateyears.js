export const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const yearsArray = [];
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    yearsArray.push(i.toString());
  }
  return yearsArray;
};
