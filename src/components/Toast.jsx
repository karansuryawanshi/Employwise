import React, { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white py-2 px-4 rounded shadow-md z-50 animate-fade-in-out flex items-center`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-3 text-white font-bold">
        ×
      </button>
    </div>
  );
};

export default Toast;
