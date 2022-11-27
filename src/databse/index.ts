export const getDatabaseByKey = (key: string) => {
  const content = localStorage.getItem(key);
  if (content) return JSON.parse(content);
  else return {};
};
export const setDatabaseByKey = (key: string, object: any) =>
  localStorage.setItem(key, JSON.stringify(object));
