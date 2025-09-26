import React, { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls chatbot visibility
  const [isFullScreen, setIsFullScreen] = useState(false); // Controls full-screen mode

  return (
    <>
      {/* Floating Chat Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 text-white rounded-full p-4 shadow-md text-2xl flex items-center justify-center w-15 h-15 z-50"
          style={{ backgroundColor: "#475226" }}
        >
          💬
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div
          className={`fixed bottom-0 right-5 z-50 bg-white shadow-xl transition-all ${
            isFullScreen
              ? "w-full h-full rounded-none"
              : "w-[90%] sm:w-[500px] h-[500px] sm:h-[600px] rounded-xl"
          }`}
        >
          {/* Header with Controls */}
          <div
            className="flex justify-end p-3 border-b"
            style={{ backgroundColor: "#475226" }}
          >
            {/* Fullscreen Button */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="bg-none border-none cursor-pointer text-2xl text-white mr-3"
              title="Toggle Fullscreen"
            >
              ⛶
            </button>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="bg-none border-none cursor-pointer text-2xl text-white"
              title="Close Chat"
            >
              ✖
            </button>
          </div>

          {/* Chatbot Iframe */}
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/6pdpRGba0zQsbwWuxmfRb"
            className="w-full h-full border-none"
            title="Chatbot"
            scrolling="no"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Chatbot;
