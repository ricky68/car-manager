// src/components/Menu.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import menuData from '../data/menu.json';

interface MenuItem {
    title: string;
    url: string;
}

const Menu: React.FC = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        setMenuItems(menuData.data);
    }, []);

    return (
        <nav className="w-48 bg-gray-100 p-4 border-r border-gray-300">
            <ul>
                {menuItems.map((item) => (
                    <li key={item.title} className="mb-2">
                        <Link to={item.url} className="text-blue-600 hover:underline">
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Menu;