import React from "react";
import { FaTwitter } from "react-icons/fa";
import { SiFacebook, SiInstagram } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="mt-auto py-6 shadow">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-bold">MOVIESHOP</h2>
          <p className="text-sm">Your one-stop shop for all things movies.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" aria-label="Facebook">
            <SiFacebook className="h-6 w-6" />
          </a>
          <a href="#" aria-label="Twitter">
            <FaTwitter className="h-6 w-6" />
          </a>
          <a href="#" aria-label="Instagram">
            <SiInstagram className="h-6 w-6" />
          </a>
        </div>
        <div className="text-sm">
          <p>Contact us: support@movieshop.com</p>
          <p>&copy; 2024 MOVIESHOP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
