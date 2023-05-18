const API = process.env.REACT_APP_BACKEND;

export const getAllProducts = () => {
  return fetch(`${API}/products`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
