import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { cartActions } from "../store/cartSlice";

function Checkout() {
  const db_url = import.meta.env.VITE_DATABASE_URL;
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector((state) => state.auth.userId);
  const [address, setAddress] = useState("");

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const placeOrderHandler = async () => {
    if (address.trim() === "") {
      alert("Please enter delivery address");
      return;
    }

    const data = {
      items: cartItems,
      totalAmount,
      address,
      PaymentMethod: "Cash on delivery",
      status: "Pending",
      orderedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${db_url}/orders/${userId}.json`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(cartActions.clearCart());

      alert("Order placed successfully!");

      history.replace("/orders");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-lg bg-white p-6 shadow">
      <h1 className="mb-6 text-3xl font-bold">Checkout</h1>

      <div className="mb-6">
        <label className="mb-2 block font-medium">Delivery Address</label>

        <textarea
          rows="4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full rounded border p-3"
          placeholder="Enter your address"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Payment Method</h2>

        <div className="mt-2 rounded bg-gray-100 p-3">
          Cash on Delivery (COD)
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Order Summary</h2>

        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between py-2">
            <span>
              {item.name} × {item.quantity}
            </span>

            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <hr className="my-3" />

        <h2 className="text-right text-2xl font-bold">
          Total : ₹{totalAmount}
        </h2>
      </div>

      <button
        onClick={placeOrderHandler}
        className="w-full rounded bg-green-600 py-3 text-white hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
