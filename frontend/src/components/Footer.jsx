 import React from 'react';
import { assets } from '../assets/assets';
import { Copyright, Mail, Phone } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="mt-40 bg-[#7c3aed] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* ---------- Logo & Description --------- */}
        <div className="col-span-2">
          {/* <img 
            className="w-40 mb-6 filter brightness-0 invert"
            src={assets.logo} 
            alt="Prescripto Logo" 
          /> */}
          <p className="text-white/80 leading-relaxed">
            Welcome, your trusted partner in mental healthcare. 
            We connect you with top professionals for a seamless healing journey.
          </p>
          <div className="mt-6 flex gap-4">
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#fef08a] hover:text-[#7c3aed] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#fef08a] hover:text-[#7c3aed] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#fef08a] hover:text-[#7c3aed] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>

        {/* ---------- Quick Links --------- */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-[#fef08a]">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <button 
                onClick={() => {
                  navigate('/');
                  scrollTo(0, 0);
                }}
                className="text-white/80 hover:text-[#fef08a] hover:underline transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  navigate('/about');
                  scrollTo(0, 0);
                }}
                className="text-white/80 hover:text-[#fef08a] hover:underline transition-colors"
              >
                About Us
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  navigate('/contact');
                  scrollTo(0, 0);
                }}
                className="text-white/80 hover:text-[#fef08a] hover:underline transition-colors"
              >
                Contact Us
              </button>
            </li>
            <li>
              <NavLink 
                to="https://merchant.razorpay.com/policy/PweTRtIOPlC8KZ/privacy"
                target="_blank"
                className="text-white/80 hover:text-[#fef08a] hover:underline transition-colors"
              >
                Privacy Policy
              </NavLink>
            </li>
          </ul>
        </div>

        {/* ---------- Contact Info --------- */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-[#fef08a]">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Phone size={18} className="mt-1 text-[#fef08a]" />
              <span className="text-white/80">+1-212-456-7890</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={18} className="mt-1 text-[#fef08a]" />
              <a 
                href="mailto:tusharwork.001@gmail.com" 
                className="text-white/80 hover:text-[#fef08a] hover:underline transition-colors"
              >
                xxxxxx.001@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ---------- Copyright --------- */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="flex items-center gap-1 text-white/60 text-sm">
            <Copyright size={14} />
            <span>Zentra 2025 - All Rights Reserved</span>
          </p>
          <p className="text-white/60 text-sm mt-3 md:mt-0">
            Made with ❤️ for better mental health
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;