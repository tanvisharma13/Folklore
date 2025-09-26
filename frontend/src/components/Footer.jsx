import React, { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import footerLogo from "../assets/footer-logo.png";  // your footer logo
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Confetti from 'react-confetti';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = forwardRef((props, ref) => {
  const emailInputRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useImperativeHandle(ref, () => ({
    scrollToInputAndHighlight: () => {
      if (emailInputRef.current) {
        emailInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        emailInputRef.current.classList.add("ring-4", "ring-yellow-400");

        setTimeout(() => {
          emailInputRef.current.classList.remove("ring-4", "ring-yellow-400");
        }, 3000);
      }
    }
  }));

  const handleSubscribe = () => {
    const email = emailInputRef.current.value;
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email.");
      return;
    }

    setShowConfetti(true);
    toast.success("🎉 Subscribed successfully!");

    setTimeout(() => setShowConfetti(false), 3000);
    emailInputRef.current.value = "";
  };

  return (
    <footer className="bg-[#475226] text-[#fefae0] py-10 px-4 relative">
      {showConfetti && <Confetti numberOfPieces={150} recycle={false} />}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side: Logo aligned to the left */}
        <div className="flex flex-col items-start w-full md:w-1/2 mb-8 md:mb-0">
          <img src="/fav-icon.png" alt="Logo" className="w-32 mb-4" /> {/* Logo size */}
          {/* Navigation Links in the same row */}
          <ul className="flex gap-6">
            <li>
              <a
                href="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-primary"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  window.location.href = "/about";
                }}
                className="hover:text-primary"
              >
                About Us
              </a>
            </li>
            <li><button onClick={() => setShowModal(true)} className="hover:text-primary">Contact</button></li>
          </ul>
        </div>

        {/* Right Side - Newsletter */}
        <div className="md:w-1/2 w-full">
          <p className="mb-4">
            Subscribe to our newsletter to receive the latest updates, news, and offers!
          </p>
          <div className="flex">
            <input
              ref={emailInputRef}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md text-[#fefae0] border-2 transition-all duration-300"
            />
            <button
              className="btn-primary px-6 py-2 rounded-r-md hover:bg-[#fefae0]"
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li><a href="#privacy" className="hover:text-primary">Privacy Policy</a></li>
          <li><a href="#terms" className="hover:text-primary">Terms of Service</a></li>
        </ul>

        <div className="flex gap-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-black rounded-md p-6 w-[90%] md:w-[400px] shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-red-500"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p><strong>Email:</strong> support@folkore.com</p>
            <p><strong>Phone:</strong> +91 9876543210</p>
          </div>
        </div>
      )}
    </footer>
  );
});

export default Footer;
