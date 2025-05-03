import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube as YouTube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Online Shopping */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4 uppercase text-sm">Online Shopping</h3>
            <ul className="space-y-2">
              <li><Link to="/men" className="text-gray-600 hover:text-pink-500 text-sm">Men</Link></li>
              <li><Link to="/women" className="text-gray-600 hover:text-pink-500 text-sm">Women</Link></li>
              <li><Link to="/kids" className="text-gray-600 hover:text-pink-500 text-sm">Kids</Link></li>
              <li><Link to="/home-living" className="text-gray-600 hover:text-pink-500 text-sm">Home & Living</Link></li>
              <li><Link to="/beauty" className="text-gray-600 hover:text-pink-500 text-sm">Beauty</Link></li>
              <li><Link to="/gift-cards" className="text-gray-600 hover:text-pink-500 text-sm">Gift Cards</Link></li>
            </ul>
          </div>
          
          {/* Customer Policies */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4 uppercase text-sm">Customer Policies</h3>
            <ul className="space-y-2">
              <li><Link to="/contact-us" className="text-gray-600 hover:text-pink-500 text-sm">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-pink-500 text-sm">FAQ</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-pink-500 text-sm">T&C</Link></li>
              <li><Link to="/shipping" className="text-gray-600 hover:text-pink-500 text-sm">Shipping</Link></li>
              <li><Link to="/cancellation" className="text-gray-600 hover:text-pink-500 text-sm">Cancellation</Link></li>
              <li><Link to="/returns" className="text-gray-600 hover:text-pink-500 text-sm">Returns</Link></li>
            </ul>
          </div>
          
          {/* Myntra App */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4 uppercase text-sm">Experience Myntra App</h3>
            <p className="text-sm text-gray-600 mb-3">Download the app for the best experience</p>
            <div className="flex space-x-2">
              <a href="#" className="block">
                <img 
                  src="https://constant.myntassets.com/web/assets/img/80cc455a-92d2-4b5c-a038-7da0d92af33f1539674178924-google_play.png" 
                  alt="Google Play Store" 
                  className="h-10"
                />
              </a>
              <a href="#" className="block">
                <img 
                  src="https://constant.myntassets.com/web/assets/img/bc5e11ad-0250-420a-ac71-115a57ca35d51539674178941-apple_store.png" 
                  alt="Apple App Store" 
                  className="h-10"
                />
              </a>
            </div>
          </div>
          
          {/* Social */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4 uppercase text-sm">Keep in Touch</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-600 hover:text-pink-500"><Facebook size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-pink-500"><Twitter size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-pink-500"><Instagram size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-pink-500"><YouTube size={20} /></a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-xs text-gray-500 text-center">
            © 2025 www.myntra.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;