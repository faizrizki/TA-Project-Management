export const setToken = (
  token: string
) => {
  document.cookie = `token=${token}; path=/`;
};

export const removeToken = () => {
  document.cookie =
    "token=; Max-Age=0; path=/";
};