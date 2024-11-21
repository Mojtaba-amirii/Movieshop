import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto bg-sky-400 py-4">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-bold">MOVIESHOP</h2>
          <p className="text-sm">Your one-stop shop for all things movies.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" aria-label="Facebook">
            <Facebook className="h-6 w-6" />
          </a>
          <a href="#" aria-label="Twitter">
            <Twitter className="h-6 w-6" />
          </a>
          <a href="#" aria-label="Instagram">
            <Instagram className="h-6 w-6" />
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
