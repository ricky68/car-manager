import React from 'react';
import logo from '../assets/images/logo.png'; // Adjust the path as needed

const Header: React.FC = () => {
    return (
        <header className="bg-gray-100 text-white py-4 pb-6"> {/* Changed background to white */}
            <div className="container mx-auto flex items-center justify-center">
                <img src={logo} alt="Logo" className="h-12 mr-4" /> {/* Logo Image */}
            </div>
        </header>
    );
};

export default Header;
