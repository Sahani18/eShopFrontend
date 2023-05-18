const API = process.env.REACT_APP_BACKEND;

// catagory calls

export const createCatagory = (userId, token, catagory) => {
  return fetch(`${API}/catagory/create/${userId}`, {
    method: "POST",
    headers: {
      ACCEPT: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(catagory),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
// update catagory


export const updateCatagory = (userId, token,catagory, catagoryId) => {
  return fetch(`${API}/catagory/update/${catagoryId}/${userId}`, {
    method: "PUT",
    headers: {
      ACCEPT: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(catagory),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//get a catagory
export const getaCatagory = (catagoryId) => {
  return fetch(`${API}/catagory/${catagoryId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete catagory

export const deleteCatagory=(userID,token,catagoryID)=>{
  return fetch(`${API}/catagory/remove/${catagoryID}/${userID}`, {
    method: "DELETE",
    headers: {
      ACCEPT: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));

}

// get all catagories

export const getAllCatagories = () => {
  return fetch(`${API}/catagories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// product calls

export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      ACCEPT: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// get all products

export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// update a product

export const updateProduct = (userId, token, product, productId) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      ACCEPT: "application/json",

      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// delete a product

export const deleteProduct = (userId, token, productId) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      ACCEPT: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
// get a product

export const getaProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
