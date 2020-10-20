// import api from './api';
export const isAuthenticated = () => true;

export const TOKEN_KEY = '@token_appname';
export const ID_KEY = '@authid_appname';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getIdKey = () => localStorage.getItem(ID_KEY);

export const setIdKey = (id) => {
  localStorage.setItem(ID_KEY, id);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ID_KEY);
};
