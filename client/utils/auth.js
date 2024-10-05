export const getStoredUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const storeUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem('user');
};