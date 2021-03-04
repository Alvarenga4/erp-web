// import api from './api';
export const isAuthenticated = () => true;

export const TOKEN_KEY = '@token_appname';
export const ID_USER = '@authid_appname';
export const ID_COMPANY = '@companyid_appname';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getIDUser = () => localStorage.getItem(ID_USER);
export const getIdCompany = () => localStorage.getItem(ID_COMPANY);

export const setIdUser = (id) => {
  localStorage.setItem(ID_USER, id);
};

export const setIdCompany = (id) => {
  localStorage.setItem(ID_COMPANY, id);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ID_USER);
  localStorage.removeItem(ID_COMPANY);
};
