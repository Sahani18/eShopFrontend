const API = process.env.REACT_APP_BACKEND;

//TODO: CREATE ORDER

export const createOrder = (userID, token, orderData) => {
  return fetch(`${API}/order/create/${userID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//TODO: GET ALL ORDERS

export const getAllOrders = (userID, token) => {
  return fetch(`${API}/order/all/${userID}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//TODO: GET ORDER STATUS


export const getOrderStatus = (userID, token) => {
  return fetch(`${API}order/status/${userID}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};