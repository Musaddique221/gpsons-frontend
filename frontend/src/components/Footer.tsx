import React from "react";

const Footer = () => {
  return (
    <nav className="bg-gray-800 p-4 mt-10">
      <p className="text-center text-white">copyright {new Date().getFullYear()}. E-commerce All Rights Reserved.</p>
    </nav>
  );
};

export default Footer;
