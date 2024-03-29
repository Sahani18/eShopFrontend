const API = process.env.REACT_APP_BACKEND;

export const paypalPayment = (userID, token) => {
  fetch(`${API}/payment/paypal/${userID}`, {
    method: "POST",
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

export const getToken = (userId, token) => {
  return fetch(`${API}/payment/gettoken/${userId}`, {
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

/* export const getIntend = async({amount}) => {

  console.log("AMT",amount);
  return await fetch(`${API}/payment/secret`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify(amount),
  })
    .then((response) => {
      console.log("API CALL RESP",response.json());
      return response.json();
    })
    .catch((err) => console.log(err));
}; */

export const processPayment = (userId, token, paymentInfo) => {
  return fetch(`${API}/payment/braintree/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentInfo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
