import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';

const CheckoutPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
  const { currentUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handlePayment = async (orderData) => {
    try {
      const response = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice }),
      });

      const order = await response.json();

      if (!order.id) {
        alert("Error creating order");
        return;
      }

      const options = {
        key: "rzp_test_hum4AjwPDSgi5p",
        amount: order.amount,
        currency: "INR",
        name: "Your Book Store",
        description: "Book Purchase Payment",
        order_id: order.id,
        handler: async (response) => {
          const verifyResponse = await fetch("http://localhost:5000/api/payment/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const result = await verifyResponse.json();

          if (result.success) {
            await createOrder(orderData).unwrap();
            triggerConfetti();
            Swal.fire({
              title: "Payment Successful!",
              text: "Your order has been placed successfully!",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Okay!"
            });
            navigate("/orders");
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: orderData.name,
          email: orderData.email,
          contact: orderData.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed, please try again.");
    }
  };

  const onSubmit = async (data) => {
    const newOrder = {
      name: data.name,
      email: data.email,
      address: {
        addressLine: data.addressLine,
        city: data.city,
        country: data.country,
        state: data.state,
        pincode: data.pincode
      },
      phone: data.phone,
      productIds: cartItems.map(item => item?._id),
      totalPrice: totalPrice,
    };

    handlePayment(newOrder);
  };

  if (isLoading) return <div>Loading....</div>;

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600 mb-2">Checkout</h2>
            <p className="text-gray-500 mb-2">Total Price: INR {totalPrice}</p>
            <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>
          </div>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 text-sm grid-cols-1 lg:grid-cols-3 my-8">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>
              <div className="lg:col-span-2">
                <div className="grid gap-4 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="name">Full Name</label>
                    <input {...register("name", { required: "Name is required" })} type="text" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="email">Email Address</label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email format"
                        }
                      })}
                      type="email"
                      id="email"
                      placeholder="you@example.com"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="phone">Phone Number</label>
                    <input {...register("phone", { required: "Phone number is required" })} type="number" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="+91 9876504321" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="addressLine">Address Line</label>
                    <input {...register("addressLine", { required: "Address is required" })} type="text" id="addressLine" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Street address, apartment, etc." />
                    {errors.addressLine && <p className="text-red-500 text-xs mt-1">{errors.addressLine.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="city">City</label>
                    <input {...register("city", { required: "City is required" })} type="text" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="country">Country</label>
                    <input {...register("country", { required: "Country is required" })} type="text" id="country" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="state">State</label>
                    <input {...register("state", { required: "State is required" })} type="text" id="state" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="pincode">Pincode</label>
                    <input {...register("pincode", { required: "Pincode is required" })} type="text" id="pincode" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                    {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>}
                  </div>

                  <div className="md:col-span-5 mt-3">
                    <div className="inline-flex items-center">
                      <input onChange={(e) => setIsChecked(e.target.checked)} type="checkbox" id="billing_same" className="form-checkbox" />
                      <label htmlFor="billing_same" className="ml-2">I agree to the <Link className='underline text-blue-600'>Terms & Conditions</Link>.</label>
                    </div>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <button disabled={!isChecked} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Pay with Razorpay</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
