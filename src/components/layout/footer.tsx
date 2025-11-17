import { FaTwitter } from "react-icons/fa";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { Film, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-linear-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-purple-600 shadow-lg">
                <Film className="h-6 w-6 text-white" />
              </div>
              <h2 className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-extrabold text-transparent">
                MOVIESHOP
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              Your one-stop shop for all things movies. Stream thousands of
              titles instantly.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              <a
                href="mailto:support@movieshop.com"
                className="transition-colors hover:text-blue-600"
              >
                support@movieshop.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                >
                  Browse Movies
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/my-movies"
                  className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                >
                  My Library
                </a>
              </li>
              <li>
                <a
                  href="/my-profile"
                  className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                >
                  My Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase">
              Connect With Us
            </h3>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-blue-700 text-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-sky-500 to-sky-600 text-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-pink-600 to-purple-600 text-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-600 md:flex-row">
            <p>&copy; 2025 MOVIESHOP. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with <Heart className="h-4 w-4 fill-red-500 text-red-500" />{" "}
              for movie lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
