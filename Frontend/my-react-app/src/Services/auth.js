export const TOKEN_KEY = "@ucorp-Token";
export const USER_ROLES = "@user-Roles";
export const USER_ID = "@user-Id";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) != null;
export const hasRole = () => localStorage.getItem(USER_ROLES) != null;
export const checkRole = (role) => {
  if (!isAuthenticated()) return false;
  const roles = localStorage.getItem(USER_ROLES);
  return roles ? JSON.parse(roles).includes(role) : false;
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getRoles = () => localStorage.getItem(USER_ROLES);
export const getUserId = () => localStorage.getItem(USER_ID);

export const login = (token, roles) => {
  localStorage.setItem(TOKEN_KEY, token);
  if (Array.isArray(roles) && roles.length)
    localStorage.setItem(USER_ROLES, JSON.stringify(roles));
};

export const setUserId = (id) => {
  localStorage.setItem(USER_ID, id);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ROLES);
  localStorage.removeItem(USER_ID);
};
