const API = process.env.REACT_APP_BACKEND;

//sign up user

export const signup = (user) => {
  return fetch(`${API}\signup`, {
    method: "POST",
    headers: {
      ACCEPT: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// sign in user

export const signin = (user) => {
  return fetch(`${API}\signin`, {
    method: "POST",
    headers: {
      ACCEPT: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//authenticate user by setting jwt token in local storage

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

//signout user

export const signout = (next) => {
  //clear token from local storage
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    // signout from backend
    return fetch(`${API}\signout`, {
      method: "GET",
    })
      .then((response) => console.log("Signout Success"))
      .catch((err) => console.log(err));
  }
};

// check authentication

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt")); //we will match token in frontend for that particular user
  } else {
    return false;
  }
};
