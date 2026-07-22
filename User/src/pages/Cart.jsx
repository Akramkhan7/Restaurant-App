import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { cartActions } from "../Store/cartSlice";
import CartModal from "../services/CartModal";
import { useState } from "react";

function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();

  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  if (items.length === 0) {
    return (
      <div className="mt-20 text-center">
        <h1 className="text-3xl font-bold">Your Cart is Empty</h1>

        <button
          onClick={() => history.push("/home")}
          className="mt-6 rounded bg-blue-600 px-6 py-3 text-white"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-8 text-3xl font-bold">My Cart</h1>

      {items.map((item) => (
        <div
          key={item.id}
          className="mb-4 flex items-center justify-between rounded-lg border p-4 shadow"
        >
          <div>
            <h2 className="text-xl font-semibold">{item.recipeName}</h2>
            <p>₹{item.price}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                dispatch(cartActions.decreaseQuantity(item.id))
              }
              className="rounded bg-gray-300 px-3 py-1"
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() =>
                dispatch(cartActions.increaseQuantity(item.id))
              }
              className="rounded bg-gray-300 px-3 py-1"
            >
              +
            </button>
          </div>

          <div>
            ₹{item.price * item.quantity}
          </div>

          <button
            onClick={() =>
              dispatch(cartActions.removeFromCart(item.id))
            }
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Total: ₹{totalAmount}
        </h2>

        <button
          onClick={() => history.push("/checkout")}
          className="rounded bg-green-600 px-6 py-3 text-white"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;