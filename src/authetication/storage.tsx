const setStorage = (name: string, value: string) => {
  return new Promise((resolve, reject) => {
    sessionStorage.setItem(name, value);
    return resolve("OK");
  });
};

const deleteStorage = (name: string) => {
  return new Promise((resolve, reject) => {
    return resolve(sessionStorage.removeItem(name));
  });
};

const resetStorage = () => {
  return new Promise((resolve, reject) => {
    return resolve(sessionStorage.clear());
  });
};

const getStorage = (item: string) => {
  return new Promise((resolve, reject) => {
    return resolve(sessionStorage.getItem(item));
  });
};

export { setStorage, deleteStorage, resetStorage, getStorage };
