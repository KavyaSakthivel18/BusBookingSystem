import React from 'react';
import { FaBus, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaBus className="text-blue-400 text-2xl" />
              <h3 className="text-xl font-bold text-white">BusBooking</h3>
            </div>
            <p className="text-sm">Your trusted partner for safe and comfortable bus travel.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Book a Bus</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">My Bookings</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <FaPhone className="text-blue-400" />
                <span>+91 1800-000-1234</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-blue-400" />
                <span>info@busbooking.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4 text-xl">
              <a href="#" className="text-blue-400 hover:text-blue-300 transition">
                <FaFacebook />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition">
                <FaTwitter />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; 2024 BusBooking. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition">Cancellation Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
