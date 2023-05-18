export const addItemToCart = (item) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({ ...item});
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
};
