import React from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import logo from "../../assets/redHeartLogoo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Shipping Info", path: "/shipping" },
    { name: "Returns", path: "/returns" },
  ];

  const customerService = [
    { name: "FAQ", path: "/faq" },
    { name: "Track Order", path: "/track-order" },
    { name: "Gift Cards", path: "/gift-cards" },
    { name: "Size Guide", path: "/size-guide" },
  ];

  const legal = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "Refund Policy", path: "/refund-policy" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-black-soft text-primary-white border-t border-grey-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <img
                src={logo}
                alt="RedHeart Logo"
                className="h-10 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-elegant text-2xl sm:text-3xl text-accent-rose-600 leading-none">
                  Red Heart
                </span>
                <span className="font-body text-[10px] sm:text-xs text-grey-400 tracking-[0.15em] uppercase mt-0.5">
                  Premium Florals
                </span>
              </div>
            </Link>
            <p className="font-body text-sm text-grey-400 mb-6 font-light leading-relaxed max-w-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-grey-300">
                <Phone className="w-4 h-4 text-accent-rose-600 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-body text-sm font-light">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-grey-300">
                <Mail className="w-4 h-4 text-accent-rose-600 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-body text-sm font-light">hello@redheart.com</span>
              </div>
              <div className="flex items-start space-x-3 text-grey-300">
                <MapPin className="w-4 h-4 text-accent-rose-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="font-body text-sm font-light">123 Flower Street, Garden City, NY 11530</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-base font-light text-primary-white mb-4 tracking-tight">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-body text-sm text-grey-400 hover:text-accent-rose-400 transition-colors duration-300 font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-display text-base font-light text-primary-white mb-4 tracking-tight">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {customerService.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-body text-sm text-grey-400 hover:text-accent-rose-400 transition-colors duration-300 font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display text-base font-light text-primary-white mb-4 tracking-tight">
              Legal
            </h3>
            <ul className="space-y-3">
              {legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-body text-sm text-grey-400 hover:text-accent-rose-400 transition-colors duration-300 font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="mt-12 pt-8 border-t border-grey-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="font-body text-sm text-grey-400 font-light hidden sm:block">Follow Us:</span>
              <div className="flex items-center space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 flex items-center justify-center border border-grey-700 hover:border-accent-rose-600 text-grey-400 hover:text-accent-rose-600 transition-all duration-300 group"
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex-1 max-w-md w-full">
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 bg-grey-900 border border-grey-700 text-primary-white placeholder:text-grey-500 font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm font-light transition-all duration-300 border border-accent-rose-700/30"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-grey-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-sm text-grey-500 font-light">
              &copy; {currentYear} RedHeart. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-grey-500">
              <Heart className="w-4 h-4 text-accent-rose-600" strokeWidth={1.5} fill="currentColor" />
              <span className="font-body text-sm font-light">Made with love</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;