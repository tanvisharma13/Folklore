import { Link, useNavigate } from "react-router-dom";
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { PiBooksDuotone } from "react-icons/pi";

import avatarImg from "../assets/avatar.png";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (bookId) => {
    navigate(`/books/${bookId}`);
    setSearchQuery("");
    setSuggestions([]);
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const debounce = setTimeout(() => {
      fetch(`http://localhost:5000/api/books?search=${encodeURIComponent(searchQuery)}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(Array.isArray(data) ? data.slice(0, 5) : []);
        })
        .catch((err) => {
          console.error("Error fetching suggestions:", err);
          setSuggestions([]);
        });
    }, 300); // debounce input

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const token = localStorage.getItem("token");

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6 sticky top-0 z-50 bg-[#475226] text-[#fefae0] shadow-sm">
      <nav className="flex justify-between items-center">
        {/* Left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <PiBooksDuotone className="size-8" />
          </Link>

          {/* Search input with dropdown */}
          <form onSubmit={handleSearch} className="relative sm:w-72 w-40 text-black" ref={dropdownRef}>
            <IoSearchOutline className="absolute left-3 inset-y-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search here..."
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-50 top-10 left-0 w-full bg-white text-black border rounded-md shadow-md max-h-60 overflow-y-auto">
                {suggestions.map((book) => (
                  <li
                    key={book._id}
                    onClick={() => handleSuggestionClick(book._id)}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {book.title}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>

        {/* Right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div className="text-[#fefae0]">
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt="Avatar"
                    className={`size-7 rounded-full ${currentUser ? "ring-2 ring-blue-500" : ""}`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                          <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : token ? (
              <Link to="/dashboard" className="border-b-2 text-[#fefae0] border-primary">
                Dashboard
              </Link>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div>

          <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm ">
            <HiOutlineShoppingCart className="size-5.5" />
            <span className="text-sm font-semibold sm:ml-1 ">
              {cartItems.length > 0 ? cartItems.length : "0"}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
