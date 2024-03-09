export const groupData = (arr, key) => {
  return arr.reduce((acc, obj) => {
    const group = obj[key];
    // Add the object to the group based on the key
    acc[group] = acc[group] || [];
    acc[group].push(obj);
    // Add the object to the "all" group
    acc.All = acc.All || arr; // Initialize "all" key with the arr parameter
    return acc;
  }, {});
};
