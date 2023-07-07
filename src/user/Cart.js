import { Trash, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import Navbar from "../core/Navbar";
import Base from "../core/Base";
import { loadCart, removeCartItem, cartEmpty } from "../core/helper/cartHelper";
import { ToastContainer, toast } from "react-toastify";
import { isAuthenticated } from "../auth/helper";
import StripeCheckout from "react-stripe-checkout";
import { createOrder } from "../core/helper/orderHelper";
import { NavLink } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { getToken } from "../core/helper/paypalHelper";

const API = process.env.REACT_APP_BACKEND;

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [discount, setDiscount] = useState("");
  const [total, setTotal] = useState(0);
  const userID = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  const Currencyconversion = 100;
  const [info, setInfo] = useState({
    loading: true,
    error: false,
    clientToken: null,
    error: "",
  });

  const getmeToken = (userId, token) => {
    getToken(userId, token).then((info) => {
      // console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };
  const increaseCount = () => {
    return setCount(count + 1);
  };

  const decreaseCount = () => {
    return count > 0 ? setCount(count - 1) : setCount(0);
  };

  useEffect(() => {
    setProducts(loadCart());
    /*  getmeToken(userID, token); */
  }, []);

  const payPal = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success">Buy</button>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
    );
  };

  const getCartAmount = () => {
    let amount = 0;
    products.forEach((item) => {
      amount = amount + item.price;
    });
    return amount;
  };

  const checkCoupon = () => {
    if (discount !== "") {
      if (products.length > 0) {
        if (discount === "SAHANI" || discount === "SUBHANSHU") {
          setDiscountPrice(100);
          toast("Coupon Applied", { theme: "colored", type: "success" });
        } else toast("Invalid Coupon", { theme: "colored", type: "error" });
      } else toast("Add products First", { theme: "colored", type: "info" });
    } else toast("Enter Coupon Code", { theme: "colored", type: "warning" });
  };

  const onCouponChange = (e) => {
    setDiscount(e.target.value.toUpperCase());
  };

  const stripeAmount = () => {
    let amount = getCartAmount() - discountPrice;

    return amount;
  };
  /*  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userID, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          createOrder(userID, token, orderData).then((data) =>
            console.log(data)
          );
          cartEmpty(() => {
            console.log("Did we got a crash?");
          });
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  }; */
  const onStripeClick = async (amount) => {
    await fetch(`${API}/payment/secret`, {
      method: "POST",
      body: JSON.stringify(amount),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const makePayment = async (token) => {
    const body = {
      token: token,
      amount: stripeAmount() * Currencyconversion,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/payment/stripe`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        // console.log("Line 150",response.json());
        /*      const {client_secret}=await response.json();
        console.log("Secret",client_secret); */
        const orderData = {
          products: products,
          transaction_id: response.transaction.id,
          amount: response.transaction.amount,
        };
        createOrder(userID, token, orderData).then((data) => {
          console.log(data);
          toast("Order Placed");

          cartEmpty(() => {
            console.log("Did we got a crash?");
          });
          return;
        });
      })
      .catch((err) => console.log(err));
  };

  const showPaymentButton = () => {
    return isAuthenticated() ? (
      <>
        <StripeCheckout
          stripeKey={process.env.REACT_APP_STRIPE_PUBLISH_KEY}
          token={makePayment}
          amount={stripeAmount() * Currencyconversion}
          key={token}
          shippingAddress=""
          billingAddress=""
          email=""
          name="E Kart"
          allowRememberMe
          currency="INR"
        >
          {" "}
          <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
            Pay with Stripe
          </button>{" "}
        </StripeCheckout>
        <br />
        <button
          onClick={() => {
            let amount = stripeAmount() * Currencyconversion;
            onStripeClick(amount);
          }}
          className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
        >
          Pay with Paypal
        </button>
      </>
    ) : (
      <>
        <NavLink to="/signin">
          <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
            SignIn to Proceed
          </button>
        </NavLink>
      </>
    );
  };

  return (
    <div className="flex h-full">
      <div className="w-2/3  p-10 ">
        {/*  cart item layout */}
        {products ? (
          products.map((item, index) => {
            return (
              <div
                key={index}
                className="w-[500px] bg-gray-700 h-40 mt-4 rounded-lg shadow-lg flex "
              >
                <div className="h-32 w-48  rounded-md bg-white content-center ">
                  <img
                    src={`${API}/product/photo/${item._id}`}
                    className="h-40 w-full rounded-l-lg"
                  />
                </div>
                <div className="h-36 w-[300px] content-center ml-5 mt-1 justify-start">
                  <p className="text-2xl text-gray-300">{item.name}</p>
                  <p className="text-sm text-gray-400">{item.description}</p>
                  <p className="text-lg text-gray-300 mt-3">₹ {item.price}</p>

                  <div className=" flex text-sm pt-4 justify-between">
                    <div className="  flex">
                      <div className="min-w-24 flex">
                        <button
                          onClick={decreaseCount}
                          type="button"
                          className=" "
                        >
                          <p className="text-2xl -mt-6 pr-1">_</p>
                        </button>
                        <input
                          type="text"
                          className="mx-1 h-7 w-9 rounded-md border text-center"
                          value={count}
                        />
                        <button
                          onClick={increaseCount}
                          type="button"
                          className=" "
                        >
                          <p className="text-2xl -mt-1">+</p>
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        removeCartItem(item._id);
                        setProducts(loadCart());
                      }}
                      className="flex items-center space-x-1 px-2 py-1 pl-0"
                    >
                      <Trash size={16} className="text-red-500" />
                      <span className="text-sm font-semibold text-red-500">
                        Remove Item
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-screen justify-center text-center text-4xl mx-auto">
            {" "}
            Cart is Empty
          </div>
        )}
      </div>
      {products ? (
        <div className="w-1/3 bg-gray-700 rounded-lg mt-6 mr-10 h-fit p-2 ">
          <section aria-labelledby="summary-heading" className="">
            <h2
              id="summary-heading"
              className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-200 sm:p-4"
            >
              Price Details
            </h2>
            <div>
              <dl className=" space-y-1 px-2 py-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-300">
                    Price ({products ? products.length : 0} item)
                  </dt>
                  <dd className="text-sm font-medium text-gray-300">
                    {getCartAmount()}
                  </dd>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <dt className="flex items-center text-sm text-gray-300">
                    <span>Discount</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-400">
                    - ₹ {discountPrice}
                  </dd>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <dt className="flex items-center text-sm text-green-400">
                    <span>Coupon</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-400 flex">
                    <input
                      type="text"
                      onChange={onCouponChange}
                      className="uppercase p-1 rounded-sm text-start w-28 mr-4 text-green-600"
                    />
                    <div
                      onClick={checkCoupon}
                      className="bg-green-600 rounded-md w-10 items-center pl-3 pt-1  text-center"
                    >
                      <Check
                        size={18}
                        className="text-gray-200 justify-center"
                      />
                    </div>
                  </dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="flex text-sm text-gray-300">
                    <span>Delivery Charges</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-400">Free</dd>
                </div>
                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                  <dt className="text-base font-medium text-gray-100">
                    Total Amount
                  </dt>
                  <dd className="text-base font-medium text-gray-100">
                    {stripeAmount()}
                    {/*    {getCartAmount() - discountPrice} */}
                  </dd>
                </div>
              </dl>
              <div className="px-2 pb-4 font-medium text-green-400">
                {`You will save ₹ ${discountPrice} on this order`}
              </div>
            </div>
            <br />
            {showPaymentButton()}
            <br />
          </section>
        </div>
      ) : null}
    </div>
  );
};

const ProductCart = () => {
  return (
    <>
      <Navbar />
      <Base title={"Shopping Cart"} description={"Manage your cart here"}>
        <Cart />
        <ToastContainer />
        <br />
        <br />
      </Base>
    </>
  );
};
export default ProductCart;
